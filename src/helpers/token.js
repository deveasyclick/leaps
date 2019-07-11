
export const saveToken = (token) => {
  const data = { token };
  localStorage.setItem('leaps', JSON.stringify(data));
};

export const getToken = () => {
  const { token } = JSON.parse(localStorage.getItem('leaps'));
  return token;
};

export const clearToken = () => {
  const data = JSON.parse(localStorage.getItem('leaps'));
  delete data.token;
  localStorage.setItem('leaps', JSON.stringify(data));
};
