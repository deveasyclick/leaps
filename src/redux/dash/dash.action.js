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
      docs.texts.map((text) => {
        const ref = db.collection('texts').doc();
        const myId = ref.id;
        return ref.set({
          tags: docs.tags,
          isPending: false,
          subject: docs.subject,
          topic: docs.topic,
          heading: text.heading,
          excerpt: text.excerpt,
          definition: text.definition,
          user_id: docs.user_id,
          user_email: docs.user_email,
          user_name: docs.user_name,
          user_country: docs.user_country,
          path: `texts/${myId}`,
        });
      }),
    );

    await Promise.all(
      docs.pdf.map(async (pdfs) => {
        if (Array.isArray(pdfs.value)) {
          return Promise.all(
            pdfs.value.map(async (pdf) => {
              pdfRef = storageRef.child(`pdfs/${pdf.name}`);
              await pdfRef.put(pdf);
              const ref = db.collection('pdf').doc();
              const myId = ref.id;
              return ref.set({
                tags: docs.tags,
                isPending: false,
                subject: docs.subject,
                topic: docs.topic,
                file_path: await pdfRef.getDownloadURL(),
                title: pdfs.title,
                user_email: docs.user_email,
                user_name: docs.user_name,
                user_country: docs.user_country,
                path: `pdf/${myId}`,
              });
            }),
          );
        }
        const ref = db.collection('pdf').doc();
        const myId = ref.id;
        return ref.set({
          tags: docs.tags,
          isPending: false,
          subject: docs.subject,
          topic: docs.topic,
          file_path: pdfs.value,
          title: pdfs.title,
          user_email: docs.user_email,
          user_name: docs.user_name,
          user_country: docs.user_country,
          path: `pdf/${myId}`,
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
              const ref = db.collection('images').doc();
              const myId = ref.id;
              return ref.set({
                tags: docs.tags,
                isPending: false,
                subject: docs.subject,
                topic: docs.topic,
                title: images.title,
                file_path: await imageRef.getDownloadURL(),
                user_email: docs.user_email,
                user_name: docs.user_name,
                user_country: docs.user_country,
                path: `images/${myId}`,
              });
            }),
          );
        }
        const ref = db.collection('images').doc();
        const myId = ref.id;
        return ref.set({
          tags: docs.tags,
          isPending: false,
          subject: docs.subject,
          topic: docs.topic,
          file_path: images.value,
          title: images.title,
          user_email: docs.user_email,
          user_name: docs.user_name,
          user_country: docs.user_country,
          path: `images/${myId}`,
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
              const ref = db.collection('videos').doc();
              const myId = ref.id;
              return ref.set({
                tags: docs.tags,
                isPending: false,
                subject: docs.subject,
                topic: docs.topic,
                title: videos.title,
                file_path: await videoRef.getDownloadURL(),
                user_email: docs.user_email,
                user_name: docs.user_name,
                user_country: docs.user_country,
                path: `videos/${myId}`,
              });
            }),
          );
        }
        const ref = db.collection('videos').doc();
        const myId = ref.id;
        return ref.set({
          tags: docs.tags,
          isPending: false,
          subject: docs.subject,
          topic: docs.topic,
          file_path: videos.value,
          title: videos.title,
          user_email: docs.user_email,
          user_name: docs.user_name,
          user_country: docs.user_country,
          path: `videos/${myId}`,
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

export const fetchResearcherImages = user => async (dispatch) => {
  dispatch({
    type: dashActions.FETCH_RESEARCHER_IMAGES_LOADING,
  });
  const images = [];
  db.collection('images')
    .where('user_email', '==', user.email)
    .limit(10)
    .onSnapshot(
      (querySnapshot) => {
        querySnapshot.forEach(doc => images.push(doc.data()));
        dispatch({
          type: dashActions.FETCH_RESEARCHER_IMAGES_SUCCESS,
          data: images,
        });
      },
      (error) => {
        dispatch({
          type: dashActions.FETCH_RESEARCHER_IMAGES_FAILED,
          error,
        });
      },
    );
};

export const fetchResearcherVideos = user => async (dispatch) => {
  dispatch({
    type: dashActions.FETCH_RESEARCHER_VIDEOS_LOADING,
  });
  const videos = [];
  db.collection('videos')
    .where('user_email', '==', user.email)
    .limit(10)
    .onSnapshot(
      (querySnapshot) => {
        querySnapshot.forEach(doc => videos.push(doc.data()));
        dispatch({
          type: dashActions.FETCH_RESEARCHER_VIDEOS_SUCCESS,
          data: videos,
        });
      },
      (error) => {
        dispatch({
          type: dashActions.FETCH_RESEARCHER_VIDEOS_FAILED,
          error,
        });
      },
    );
};

export const fetchResearcherPdfs = user => async (dispatch) => {
  dispatch({
    type: dashActions.FETCH_RESEARCHER_PDFS_LOADING,
  });
  const pdfs = [];
  db.collection('pdf')
    .where('user_email', '==', user.email)
    .limit(10)
    .onSnapshot(
      (querySnapshot) => {
        querySnapshot.forEach(doc => pdfs.push(doc.data()));
        dispatch({
          type: dashActions.FETCH_RESEARCHER_PDFS_SUCCESS,
          data: pdfs,
        });
      },
      (error) => {
        dispatch({
          type: dashActions.FETCH_RESEARCHER_PDFS_FAILED,
          error,
        });
      },
    );
};

export const fetchResearcherTexts = user => async (dispatch) => {
  dispatch({
    type: dashActions.FETCH_RESEARCHER_TEXTS_LOADING,
  });
  const texts = [];
  db.collection('texts')
    .where('user_email', '==', user.email)
    .onSnapshot(
      (querySnapshot) => {
        querySnapshot.forEach(doc => texts.push(doc.data()));
        dispatch({
          type: dashActions.FETCH_RESEARCHER_TEXTS_SUCCESS,
          data: texts,
        });
      },
      (error) => {
        dispatch({
          type: dashActions.FETCH_RESEARCHER_TEXTS_FAILED,
          error,
        });
      },
    );
};
export default {
  uploadResources,
  updateUserDetails,
};
