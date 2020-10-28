module.exports = {
  '*.{ts}': ['eslint --fix', 'git add'],
  '*.{ts,json}': ['prettier --write', 'git add'],
};
