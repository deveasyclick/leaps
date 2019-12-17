import { isURL } from 'validator';
import { db } from '../config/firebase';

export const validator = (val, type, name = '') => {
  let isValid = false;
  switch (type) {
    case 'email':
      isValid = !!(
        val
        && val !== ''
        && val.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)
      ); // returns a boolean
      break;
    case 'password':
      isValid = val && val !== '' && val.length >= 6;
      break;
    case 'tel':
      isValid = !!(
        val
        && val !== ''
        && val.length > 5
        && val.match(/^[+]?\d+$/)
      ); // returns a boolean
      break;
    default:
      isValid = !!(val && val !== '' && val.match(/\S+/));
  }

  if (name === 'pdf' || name === 'image' || name === 'video') {
    isValid = isURL(val);
  }

  return isValid;
};

export const updateUserUpload = async (docs) => {
  let approved = 0;
  let pending = 0;
  const images = await db
    .collection('images')
    .where('user_email', '==', docs.user_email)
    .get();
  let image;
  images.forEach((doc) => {
    image = doc.data();
    if (image.isPending) {
      pending += 1;
    } else {
      approved += 1;
    }
  });
  const videos = await db
    .collection('videos')
    .where('user_email', '==', docs.user_email)
    .get();

  let video;
  videos.forEach((doc) => {
    video = doc.data();
    if (video.isPending) {
      pending += 1;
    } else {
      approved += 1;
    }
  });

  const pdfs = await db
    .collection('pdf')
    .where('user_email', '==', docs.user_email)
    .get();

  let pdf;
  pdfs.forEach((doc) => {
    pdf = doc.data();
    if (pdf.isPending) {
      pending += 1;
    } else {
      approved += 1;
    }
  });

  const texts = await db
    .collection('texts')
    .where('user_email', '==', docs.user_email)
    .get();

  let text;
  texts.forEach((doc) => {
    text = doc.data();
    if (text.isPending) {
      pending += 1;
    } else {
      approved += 1;
    }
  });
  await db
    .collection('web_users')
    .doc(docs.user_id)
    .update({
      file_uploads: images.size + videos.size + texts.size + pdfs.size,
      file_pending: pending,
      file_approved: approved,
    });
};
