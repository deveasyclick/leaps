import { storage as firebaseStorage, db } from '../../config/firebase';
import dashActions from './dash.actionTypes';
import * as storage from '../../helpers/token';

export const uploadResources = docs => async (dispatch) => {
  dispatch({
    type: dashActions.UPLOAD_RESOURCES_LOADING,
  });
  const storageRef = firebaseStorage.ref();
  let pdfRef;
  let imageRef;
  let videoRef;
  try {
    await Promise.all(
      docs.texts.map(text => db.collection('texts').add({
        tags: docs.tags,
        isPending: true,
        subject: docs.subject,
        topic: docs.topic,
        heading: text.heading,
        excerpt: text.excerpt,
        definition: text.definition,
        user_id: docs.user_id,
        user_email: docs.user_email,
        user_name: docs.user_name,
        user_country: docs.user_country,
      })),
    );

    await Promise.all(
      docs.pdf.map(async (pdfs) => {
        if (Array.isArray(pdfs.value)) {
          return Promise.all(
            pdfs.value.map(async (pdf) => {
              pdfRef = storageRef.child(`pdfs/${pdf.name}`);
              await pdfRef.put(pdf);
              return db.collection('pdf').add({
                tags: docs.tags,
                isPending: true,
                approved: false,
                subject: docs.subject,
                topic: docs.topic,
                file_path: await pdfRef.getDownloadURL(),
                title: pdfs.title,
                user_email: docs.user_email,
                user_name: docs.user_name,
                user_country: docs.user_country,
              });
            }),
          );
        }
        return db.collection('pdf').add({
          tags: docs.tags,
          isPending: true,
          approved: false,
          subject: docs.subject,
          topic: docs.topic,
          file_path: pdfs.value,
          title: pdfs.title,
          user_email: docs.user_email,
          user_name: docs.user_name,
          user_country: docs.user_country,
        });
      }),
    );

    await Promise.all(
      docs.image.map(async (images) => {
        if (Array.isArray(images.value)) {
          return Promise.all(
            images.value.map(async (image) => {
              imageRef = storageRef.child(`images/${image.name}`);
              await imageRef.put(image);
              return db.collection('images').add({
                tags: docs.tags,
                isPending: true,
                approved: false,
                subject: docs.subject,
                topic: docs.topic,
                title: images.title,
                file_path: await imageRef.getDownloadURL(),
                user_email: docs.user_email,
                user_name: docs.user_name,
                user_country: docs.user_country,
              });
            }),
          );
        }
        return db.collection('images').add({
          tags: docs.tags,
          isPending: true,
          approved: false,
          subject: docs.subject,
          topic: docs.topic,
          file_path: images.value,
          title: images.title,
          user_email: docs.user_email,
          user_name: docs.user_name,
          user_country: docs.user_country,
        });
      }),
    );

    await Promise.all(
      docs.video.map(async (videos) => {
        if (Array.isArray(videos.value)) {
          return Promise.all(
            videos.value.map(async (video) => {
              videoRef = storageRef.child(`videos/${video.name}`);
              await videoRef.put(video);
              return db.collection('videos').add({
                tags: docs.tags,
                isPending: true,
                approved: false,
                subject: docs.subject,
                topic: docs.topic,
                title: videos.title,
                file_path: await videoRef.getDownloadURL(),
                user_email: docs.user_email,
                user_name: docs.user_name,
                user_country: docs.user_country,
              });
            }),
          );
        }
        return db.collection('videos').add({
          tags: docs.tags,
          isPending: true,
          approved: false,
          subject: docs.subject,
          topic: docs.topic,
          file_path: videos.value,
          title: videos.title,
          user_email: docs.user_email,
          user_name: docs.user_name,
          user_country: docs.user_country,
        });
      }),
    );

    dispatch({
      type: dashActions.UPLOAD_RESOURCES_SUCCESS,
      data: 'Upload Successful',
    });
  } catch (err) {
    dispatch({
      type: dashActions.UPLOAD_RESOURCES_FAILED,
      error: err.message,
    });
  }
};

export const updateUserDetails = obj => async (dispatch) => {
  dispatch({
    type: dashActions.UPDATE_DETAILS_LOADING,
  });
  const user = storage.getToken();
  const storageRef = firebaseStorage.ref();
  const imageRef = storageRef.child(`images/${obj.image.name}`);
  try {
    const querySnapshot = await db
      .collection('users')
      .where('email', '==', obj.email)
      .get();
    let downloadUrl;
    if (typeof obj.image === 'object') {
      await imageRef.put(obj.image);
      downloadUrl = await imageRef.getDownloadURL();
    }
    querySnapshot.forEach(async (doc) => {
      // Build doc ref from doc.id
      await db
        .collection('users')
        .doc(doc.id)
        .update({
          email: obj.email,
          category: obj.category,
          image: downloadUrl || obj.image,
          country: obj.country,
          name: obj.name,
        });

      user.email = obj.email;
      user.category = obj.category;
      user.image = downloadUrl || obj.image;
      user.country = obj.country;
      user.name = obj.name;
      storage.saveToken(user);
      dispatch({
        type: dashActions.UPDATE_DETAILS_SUCCESS,
        data: user,
      });
    });
  } catch (err) {
    dispatch({
      type: dashActions.UPLOAD_RESOURCES_FAILED,
      error: err.message,
    });
  }
};

export default {
  uploadResources,
  updateUserDetails,
};
