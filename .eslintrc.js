module.exports = {
  extends: ['plugin:vue/essential', '@vue/airbnb'],
  plugins: ['import'],
  env: {
    node: true
  },
  rules: {
    "comma-dangle": 0,
    "consistent-return": 0,
    "no-param-reassign": 0,
    "no-underscore-dangle": 0,
    "no-shadow": 0,
    "no-console": 0,
    "no-plusplus": 0,
    "no-unused-expressions": 0,
    "max-len": [1, 120, 2, {
      "ignorePattern": "^import\\s.+\\sfrom\\s.+;$",
      "ignoreUrls": true
    }],
  }
};
