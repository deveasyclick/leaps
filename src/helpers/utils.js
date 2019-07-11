export const validator = (val, type) => {
  switch (type) {
    case 'email':
      return !!(val
          && val !== ''
          && val.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)); // returns a boolean

    case 'password':
      return val && val !== '' && val.length >= 6;

    case 'tel':
      return !!(val && val !== '' && val.length > 5 && val.match(/^[+]?\d+$/)); // returns a boolean

    default:
      return !!(val && val !== '' && val.match(/\S+/));
  }
};
