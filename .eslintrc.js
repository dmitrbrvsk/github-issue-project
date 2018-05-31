module.exports = {
  'env': {
    'browser': true,
    'es6': true
  },
  'extends': 'airbnb',
  'parser': 'babel-eslint',
  'parserOptions': {
    'ecmaFeatures': {
      'experimentalObjectRestSpread': true,
      'jsx': true,
      'es6': true,
    },
    'sourceType': 'module'
  },
  'plugins': [
    'babel',
    'react',
    'jsx-a11y',
    'import'
  ],
  'rules': {
    'no-tabs': 0,
    'indent': ['error', 'tab', { 'SwitchCase': 1 }],
    'semi': ['error', 'never'],
    'max-len': ['error', { 'code': 120, 'ignoreUrls': true }],
    'no-console': ['warn'],
    'no-unused-vars': ['warn'],
    'consistent-return': 0,
    'comma-dangle': ['error', 'never'],
    'linebreak-style': ['error', 'unix'],
    'quotes': ['error', 'single'],
    'arrow-parens': ['error', 'as-needed'],
    'arrow-body-style': 0,
    'react/prop-types': 0,
    'react/jsx-indent': [2, 'tab'],
    'jsx-quotes': ['error', 'prefer-single'],
    'jsx-a11y/anchor-is-valid': [ 'error', {
      'components': [ 'Link' ],
      'specialLink': [ 'to' ],
      'aspects': [ 'noHref' ]
    }],
    'jsx-a11y/no-redundant-roles': 0,
    'object-curly-newline': 0,
    'import/prefer-default-export': 0,
    'react/jsx-closing-bracket-location': 1,
    'react/jsx-curly-spacing': ['error', 'always'],
    'react/jsx-curly-brace-presence': 0,
    'react/prefer-stateless-function': ['error', { 'ignorePureComponents': true }],
    'react/jsx-filename-extension': [1, { 'extensions': ['.js', '.jsx'] }],
    'react/jsx-indent-props': ['error', 'tab'],
    'react/jsx-no-undef': 1,
    'react/prefer-es6-class': 1,
    'react/jsx-no-bind': 1,
  },
};