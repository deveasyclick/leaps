
export const saveToken = (obj) => {
  const data = JSON.parse(localStorage.getItem('leaps')) || {};
  data.token = obj;
  localStorage.setItem('leaps', JSON.stringify(data));
};

export const getToken = () => {
  const data = JSON.parse(localStorage.getItem('leaps')) || {};
  const token = data.token || null;
  return token;
};

export const clearToken = () => {
  const data = JSON.parse(localStorage.getItem('leaps'));
  delete data.token;
  localStorage.setItem('leaps', JSON.stringify(data));
};
