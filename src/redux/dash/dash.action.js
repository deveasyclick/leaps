import { storage as firebaseStorage, db } from '../../config/firebase';
import dashActions from './dash.actionTypes';

export const uploadResources = docs => async (dispatch) => {
  dispatch({ type: dashActions.UPLOAD_RESOURCES_LOADING });
  const storageRef = firebaseStorage.ref();
  let pdfRef;
  let imageRef;
  let videoRef;
  try {
    await Promise.all(docs.texts.map(text => db.collection('texts').add({
      tags: docs.tags,
      isPending: true,
      approved: false,
      subject: docs.subject,
      topic: docs.topic,
      heading: text.heading,
      excerpt: text.excerpt,
      definition: text.definition,
      user_id: docs.user_id,
      user_email: docs.user_email,
      user_name: docs.user_name,
      user_country: docs.user_country,
    })));

    await Promise.all(docs.pdf.map(async (pdfs) => {
      if (Array.isArray(pdfs)) {
        return Promise.all(pdfs.map(async (pdf) => {
          pdfRef = storageRef.child(`pdfs/${pdf.name}`);
          await pdfRef.put(pdf);
          return db.collection('pdf').add(
            {
              tags: docs.tags,
              isPending: true,
              approved: false,
              subject: docs.subject,
              topic: docs.topic,
              file_path: pdfRef.fullPath,
              user_email: docs.user_email,
              user_name: docs.user_name,
              user_country: docs.user_country,
            },
          );
        }));
      }
      return db.collection('pdf').add(
        {
          tags: docs.tags,
          isPending: true,
          approved: false,
          subject: docs.subject,
          topic: docs.topic,
          file_path: pdfs,
          user_email: docs.user_email,
          user_name: docs.user_name,
          user_country: docs.user_country,
        },
      );
    }));


    await Promise.all(docs.image.map(async (images) => {
      if (Array.isArray(images)) {
        return Promise.all(images.map(async (image) => {
          imageRef = storageRef.child(`images/${image.name}`);
          await imageRef.put(image);
          return db.collection('images').add(
            {
              tags: docs.tags,
              isPending: true,
              approved: false,
              subject: docs.subject,
              topic: docs.topic,
              file_path: imageRef.fullPath,
              user_email: docs.user_email,
              user_name: docs.user_name,
              user_country: docs.user_country,
            },
          );
        }));
      }
      return db.collection('images').add(
        {
          tags: docs.tags,
          isPending: true,
          approved: false,
          subject: docs.subject,
          topic: docs.topic,
          file_path: images,
          user_email: docs.user_email,
          user_name: docs.user_name,
          user_country: docs.user_country,
        },
      );
    }));

    await Promise.all(docs.video.map(async (videos) => {
      if (Array.isArray(videos)) {
        return Promise.all(videos.map(async (video) => {
          videoRef = storageRef.child(`videos/${video.name}`);
          await videoRef.put(video);
          return db.collection('videos').add(
            {
              tags: docs.tags,
              isPending: true,
              approved: false,
              subject: docs.subject,
              topic: docs.topic,
              file_path: videoRef.fullPath,
              user_email: docs.user_email,
              user_name: docs.user_name,
              user_country: docs.user_country,
            },
          );
        }));
      }
      return db.collection('videos').add(
        {
          tags: docs.tags,
          isPending: true,
          approved: false,
          subject: docs.subject,
          topic: docs.topic,
          file_path: videos,
          user_email: docs.user_email,
          user_name: docs.user_name,
          user_country: docs.user_country,
        },
      );
    }));


    dispatch({ type: dashActions.UPLOAD_RESOURCES_SUCCESS, data: 'Upload Successful' });
  } catch (err) {
    dispatch({ type: dashActions.UPLOAD_RESOURCES_FAILED, error: err.message });
  }
};

export default {
  uploadResources,
};
