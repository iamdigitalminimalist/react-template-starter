import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import react from 'eslint-plugin-react';
import a11y from 'eslint-plugin-jsx-a11y';

export default tseslint.config(
  { ignores: ['dist', '**/coverage/*'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: {
        ...globals.browser,
        React: 'readonly',
      },
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      react: react,
      'jsx-a11y': a11y,
    },
    rules: {
      // ========== React Rules ==========
      // Ensure React-related best practices
      'react/jsx-uses-react': 'error', // Prevent unused React imports
      'react/jsx-uses-vars': 'error', // Prevent unused variables in JSX
      'react/prop-types': 'off', // Disable PropTypes enforcement (not used in TypeScript)
      'react/jsx-no-duplicate-props': 'error', // Avoid duplicate props in JSX
      'react/jsx-no-undef': 'error', // Prevent undefined variables in JSX
      'react/no-children-prop': 'error', // Disallow passing children as props
      'react/no-deprecated': 'warn', // Flag deprecated React methods
      'react/no-direct-mutation-state': 'error', // Prevent direct state mutations
      'react/no-unescaped-entities': 'error', // Avoid unescaped characters in JSX
      'react/self-closing-comp': 'warn', // Encourage self-closing tags for components without children
      'react/no-array-index-key': 'warn', // Discourage using array indices as keys
      'react/no-unknown-property': 'error', // Prevent unknown DOM properties in JSX
      'react/jsx-pascal-case': 'warn', // Enforce PascalCase for JSX components
      'react/no-unstable-nested-components': 'warn', // Prevent unstable components in JSX
      'react/function-component-definition': [
        'warn', // Enforce consistent function component definitions
        {
          namedComponents: 'function-declaration',
          unnamedComponents: 'function-expression',
        },
      ],
      'react/jsx-no-bind': [
        'warn', // Limit function binding in JSX
        {
          ignoreRefs: true,
          allowArrowFunctions: true,
          allowFunctions: false,
          allowBind: false,
        },
      ],
      'react/jsx-key': 'warn', // Ensure unique keys in JSX lists

      // ========== React Hooks ==========
      // Enforce best practices for React Hooks
      ...reactHooks.configs.recommended.rules, // Include recommended React Hooks rules
      'react-hooks/exhaustive-deps': 'warn', // Warn about missing dependencies in useEffect

      // ========== React Refresh ==========
      // Ensure fast refresh works properly
      'react-refresh/only-export-components': [
        'warn', // Limit exported components to avoid refresh issues
        { allowConstantExport: true },
      ],

      // ========== TypeScript Rules ==========
      '@typescript-eslint/no-unused-vars': [
        'warn', // Warn about unused variables
        { argsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/explicit-function-return-type': [
        'warn', // Enforce explicit return types for functions
        {
          allowExpressions: true,
          allowTypedFunctionExpressions: true,
        },
      ],
      '@typescript-eslint/no-explicit-any': 'warn', // Discourage usage of `any` type
      '@typescript-eslint/no-floating-promises': 'error', // Prevent unhandled Promises
      '@typescript-eslint/consistent-type-imports': 'warn', // Prefer consistent type imports
      '@typescript-eslint/no-unnecessary-type-assertion': 'warn', // Avoid unnecessary type assertions
      '@typescript-eslint/no-non-null-assertion': 'warn', // Discourage non-null assertions
      '@typescript-eslint/no-inferrable-types': 'warn', // Avoid specifying unnecessary types
      '@typescript-eslint/no-unnecessary-condition': 'warn', // Avoid unnecessary conditional checks
      '@typescript-eslint/prefer-optional-chain': 'warn', // Prefer optional chaining
      '@typescript-eslint/prefer-nullish-coalescing': 'warn', // Prefer nullish coalescing over `||`
      '@typescript-eslint/prefer-as-const': 'warn', // Prefer `as const` for literal types
      '@typescript-eslint/no-misused-promises': 'error', // Avoid misuse of Promises
      '@typescript-eslint/no-unnecessary-type-arguments': 'warn', // Avoid redundant type arguments
      '@typescript-eslint/switch-exhaustiveness-check': 'error', // Ensure exhaustive switch statements
      '@typescript-eslint/require-array-sort-compare': 'error', // Enforce compare function for `Array.sort`

      // ========== Accessibility Rules ==========
      // Ensure accessibility standards in JSX
      'jsx-a11y/alt-text': 'warn', // Require alt text for images
      'jsx-a11y/anchor-has-content': 'warn', // Enforce content in anchors
      'jsx-a11y/anchor-is-valid': 'warn', // Prevent invalid anchor elements
      'jsx-a11y/aria-props': 'warn', // Validate ARIA properties
      'jsx-a11y/aria-role': 'warn', // Validate ARIA roles
      'jsx-a11y/role-has-required-aria-props': 'warn', // Ensure roles have required ARIA props
      'jsx-a11y/click-events-have-key-events': 'warn', // Ensure interactive elements are keyboard-accessible
      'jsx-a11y/no-static-element-interactions': 'warn', // Avoid event handlers on static elements
      'jsx-a11y/no-noninteractive-element-interactions': 'warn', // Avoid handlers on non-interactive elements
      'jsx-a11y/aria-unsupported-elements': 'warn', // Prevent invalid ARIA usage
      'jsx-a11y/heading-has-content': 'warn', // Require content in headings
      'jsx-a11y/media-has-caption': 'warn', // Ensure media elements have captions
      'jsx-a11y/no-autofocus': 'warn', // Avoid autoFocus
      'jsx-a11y/tabindex-no-positive': 'warn', // Discourage positive tabIndex
      'jsx-a11y/label-has-associated-control': [
        'warn', // Ensure labels have associated controls
        {
          labelComponents: ['Label'],
          labelAttributes: ['label'],
          controlComponents: ['Input'],
          depth: 3,
        },
      ],

      // ========== Best Practices ==========
      'default-case': 'warn', // Require default case in switch
      'no-alert': 'warn', // Discourage use of `alert` and `confirm`
      'no-shadow': 'warn', // Prevent variable shadowing
      'no-use-before-define': ['error', { functions: false, classes: true }], // Disallow using variables before defining them
      'prefer-const': 'error', // Prefer `const` for immutable variables
      'no-var': 'error', // Disallow `var`
      'prefer-template': 'warn', // Encourage template literals
      'no-implicit-coercion': 'warn', // Avoid shorthand type conversions
      'consistent-return': 'error', // Enforce consistent return statements
      'no-console': ['warn', { allow: ['warn', 'error'] }], // Limit console usage
      'no-debugger': 'warn', // Warn about debugger usage
      curly: ['error', 'multi-line'], // Enforce curly braces for multiline blocks
      eqeqeq: ['error', 'always'], // Require strict equality checks

      // ========== Formatting ==========
      'eol-last': ['error', 'always'], // Enforce newline at end of files
      'linebreak-style': ['error', 'unix'], // Use Unix line endings
      quotes: ['error', 'single', { avoidEscape: true }], // Prefer single quotes
      semi: ['error', 'always'], // Require semicolons
      'padding-line-between-statements': [
        'warn', // Enforce spacing between statements
        { blankLine: 'always', prev: '*', next: 'return' },
        { blankLine: 'always', prev: ['const', 'let', 'var'], next: '*' },
        {
          blankLine: 'any',
          prev: ['const', 'let', 'var'],
          next: ['const', 'let', 'var'],
        },
      ],
      'spaced-comment': ['warn', 'always', { markers: ['/'] }], // Enforce space in comments
      'object-curly-spacing': ['error', 'always'], // Enforce spacing in curly braces
      'array-bracket-spacing': ['error', 'never'], // Disallow spacing in array brackets

      // ========== Naming Conventions ==========
      '@typescript-eslint/naming-convention': [
        'error', // Enforce consistent naming conventions
        {
          selector: 'variableLike',
          format: ['camelCase', 'PascalCase', 'UPPER_CASE'],
        },
        {
          selector: 'typeLike',
          format: ['PascalCase'],
        },
      ],
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
);
