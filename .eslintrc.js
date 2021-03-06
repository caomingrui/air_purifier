module.exports = {
  'root': true,
  'extends': [
    'eslint:recommended',
    'eslint-config-airbnb',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'plugin:import/typescript',
    'plugin:react-hooks/recommended',
    // "airbnb"
  ],
  'parser': '@typescript-eslint/parser',
  'plugins': ['react', 'react-native', 'prettier', '@typescript-eslint'],
  'env': {
    'node': true,
    'es6': true,
    'jest': true
  },
  'globals': {
    'define': true,
    'require': true,
    'module': true,
    'window': true,
    '__DEV__': true
  },
  'parserOptions': {
    'ecmaVersion': 6,
    'sourceType': 'module',
    'ecmaFeatures': {
      'jsx': true,
      'arrowFunctions': true,
      'blockBindings': true,
      'classes': true,
      'defaultParams': true,
      'destructuring': true,
      'forOf': true,
      'generators': true,
      'modules': true,
      'objectLiteralComputedProperties': true,
      'objectLiteralShorthandMethods': true,
      'objectLiteralShorthandProperties': true,
      'spread': true,
      'superInFunctions': true,
      'templateStrings': true
    }
  },
  'rules': {
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        'js': 'never',
        'jsx': 'never',
        'ts': 'never',
        'tsx': 'never'
      }
    ],
    '@typescript-eslint/explicit-module-boundary-types': 0,
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
    'react/destructuring-assignment': 0,
    'prettier/prettier': 1,
    'arrow-parens': 'off',
    'arrow-body-style': 0,
    'class-methods-use-this': 0,
    'strict': [1, 'global'],
    'no-var': 2,
    'comma-dangle': 0,
    'no-extra-bind': 1,
    'no-shadow': 1,
    'function-paren-newline': 0,
    'no-unused-vars': [
      2,
      {
        'vars': 'local',
        'args': 'after-used'
      }
    ],
    'no-undef': 1,
    'object-curly-newline': 0,
    'no-unused-expressions': [
      1,
      {
        'allowShortCircuit': true
      }
    ],
    'no-use-before-define': 0,
    'prefer-destructuring': 1,
    'yoda': 0,
    'no-new': 0,
    'no-plusplus': 0,
    'consistent-return': 0,
    'dot-notation': [
      2,
      {
        'allowKeywords': true
      }
    ],
    'no-native-reassign': 1,
    'no-return-assign': 1,
    'no-constant-condition': 1,
    'no-mixed-operators': 0,
    'max-len': [
      1,
      150,
      2,
      {
        'ignoreComments': true,
        'ignoreUrls': true
      }
    ],
    'no-caller': 1,
    'no-loop-func': 1,
    'no-console': 0,
    'no-catch-shadow': 2,
    'no-new-require': 0,
    'no-mixed-requires': [0, false],
    'no-path-concat': 0,
    'handle-callback-err': 0,
    'no-empty': 0,
    'indent': [
      2,
      2,
      {
        'SwitchCase': 1
      }
    ],
    'camelcase': [
      1,
      {
        'properties': 'never'
      }
    ],
    'quotes': [2, 'single', { 'allowTemplateLiterals': true }],
    'brace-style': [
      2,
      '1tbs',
      {
        'allowSingleLine': true
      }
    ],
    'comma-spacing': [
      2,
      {
        'before': false,
        'after': true
      }
    ],
    'comma-style': [2, 'last'],
    'eol-last': 0,
    'func-names': 0,
    'new-cap': [
      2,
      {
        'newIsCap': true
      }
    ],
    'key-spacing': [
      1,
      {
        'beforeColon': false,
        'afterColon': true
      }
    ],
    'no-multi-spaces': 2,
    'no-multiple-empty-lines': 2,
    'no-nested-ternary': 0,
    'no-new-object': 2,
    'no-spaced-func': 2,
    'no-trailing-spaces': 0,
    'no-extra-parens': 0,
    'no-underscore-dangle': 0,
    'one-var': [
      2,
      {
        'uninitialized': 'never',
        'initialized': 'never'
      }
    ],
    'padded-blocks': [0, 'never'],
    'semi': 0,
    'semi-spacing': 1,
    'keyword-spacing': 2,
    'one-var-declaration-per-line': 0,
    'space-before-blocks': 2,
    'implicit-arrow-linebreak': 0,
    'space-before-function-paren': 0,
    'space-infix-ops': 2,
    'spaced-comment': [
      2,
      'always',
      {
        'exceptions': ['*!+-']
      }
    ],
    'global-require': 1,
    /**
     * React JSX
     */
    'operator-linebreak': 0,
    '@typescript-eslint/no-var-requires': 0,
    'jsx-quotes': [2, 'prefer-double'],
    'react/jsx-one-expression-per-line': 0,
    'react/jsx-curly-newline': 0,
    'react/display-name': 0,
    'react/jsx-boolean-value': 0,
    'react/jsx-no-duplicate-props': [0],
    'react/jsx-filename-extension': [1, { 'extensions': ['.js', '.jsx', '.ts', '.tsx'] }],
    'react/require-default-props': 0,
    'react/jsx-no-undef': 2,
    'react/jsx-sort-props': 0,
    'react/jsx-sort-prop-types': 0,
    'react/jsx-uses-react': 2,
    'react/jsx-uses-vars': 2,
    'react/jsx-indent': [2, 2],
    'react/jsx-indent-props': [2, 2],
    'react/jsx-key': 2,
    'react/no-did-mount-set-state': 0,
    'react/no-did-update-set-state': 0,
    'react/forbid-prop-types': ['error', { 'forbid': [] }],
    'react/no-multi-comp': 0,
    'react/no-unknown-property': 2,
    'react/prop-types': 0,
    'react/react-in-jsx-scope': 1,
    'react/self-closing-comp': 2,
    'react/jsx-props-no-spreading': 0,
    '@typescript-eslint/no-explicit-any': 0,
    'react/static-property-placement': 0,
    'react/jsx-wrap-multilines': [
      2,
      {
        'declaration': true,
        'assignment': false,
        'return': true
      }
    ],
    'react/sort-comp': [
      1,
      {
        'order': [
          'static-methods',
          'lifecycle',
          '/^on.+$/',
          '/^(get|set)(?!(InitialState$|DefaultProps$|ChildContext$)).+$/',
          'everything-else',
          '/^render.+$/',
          'render'
        ]
      }
    ],
    'react-native/no-unused-styles': 2,
    'react-native/split-platform-components': 2
  },
  'settings': {
    'import/extensions': ['.js', '.jsx', '.ts', '.tsx'],
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx']
    },

    'import/resolver': {
      'typescript': {
        'project': './tsconfig.json'
      },
      'react-native': { 'platform': 'both' },
      'node': {
        'extensions': ['.js', '.jsx', '.ios.js', '.android.js', '.ts', '.tsx']
      }
    }
  }
}
