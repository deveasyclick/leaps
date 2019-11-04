export const set = (name, obj) => {
  const data = JSON.parse(localStorage.getItem('leaps')) || {};
  data[name] = obj;
  localStorage.setItem('leaps', JSON.stringify(data));
};

export const get = (name) => {
  const data = JSON.parse(localStorage.getItem('leaps')) || {};
  return data[name] || null;
};

export const remove = (name) => {
  const data = JSON.parse(localStorage.getItem('leaps'));
  delete data[name];
  localStorage.setItem('leaps', JSON.stringify(data));
};

export const clear = () => {
  localStorage.removeItem('leaps');
};
