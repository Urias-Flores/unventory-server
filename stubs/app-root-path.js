module.exports = {
  path: '/',
  resolve: (p) => p,
  require: () => { throw new Error('not supported'); },
  toString: () => '/',
};