export function times(n, callback) {
  const res = [];
  for (let i = 0; i < n; i++) {
    res.push(callback(i));
  }
  return res;
};
