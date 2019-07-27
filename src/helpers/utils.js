import { isURL } from 'validator';

export const validator = (val, type, name = '') => {
  let isValid = false;
  switch (type) {
    case 'email':
      isValid = !!(val
          && val !== ''
          && val.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)); // returns a boolean
      break;
    case 'password':
      isValid = val && val !== '' && val.length >= 6;
      break;
    case 'tel':
      isValid = !!(val && val !== '' && val.length > 5 && val.match(/^[+]?\d+$/)); // returns a boolean
      break;
    default:
      isValid = !!(val && val !== '' && val.match(/\S+/));
  }

  if (name === 'pdf' || name === 'image' || name === 'video') {
    isValid = isURL(val);
  }

  return isValid;
};
