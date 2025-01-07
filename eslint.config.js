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
      // React rules
      'react/jsx-uses-react': 'error',
      'react/jsx-uses-vars': 'error',
      'react/prop-types': 'off',
      'react/jsx-no-duplicate-props': 'error',
      'react/jsx-no-undef': 'error',
      'react/no-children-prop': 'error',
      'react/no-deprecated': 'warn',
      'react/no-direct-mutation-state': 'error',
      'react/no-unescaped-entities': 'error',
      'react/self-closing-comp': 'warn',
      'react/no-array-index-key': 'warn', // Discourage using array indices as keys
      'react/no-unknown-property': 'error', // Disallow unknown DOM properties
      'react/jsx-pascal-case': 'warn', // Enforce PascalCase for user-defined JSX components
      'react/no-unstable-nested-components': 'warn', // Prevent unstable components in render
      'react/function-component-definition': [
        'warn',
        {
          namedComponents: 'function-declaration',
          unnamedComponents: 'function-expression',
        },
      ],

      // React Hooks
      ...reactHooks.configs.recommended.rules,
      'react-hooks/exhaustive-deps': 'warn',

      // React Refresh
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],

      // Code Style and Best Practices
      'consistent-return': 'error',
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'no-debugger': 'warn',
      curly: ['error', 'multi-line'],
      eqeqeq: ['error', 'always'],
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/explicit-function-return-type': [
        'warn',
        {
          allowExpressions: true,
          allowTypedFunctionExpressions: true,
        },
      ],
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-floating-promises': 'error',
      '@typescript-eslint/consistent-type-imports': 'warn',
      '@typescript-eslint/no-unnecessary-type-assertion': 'warn',
      '@typescript-eslint/no-non-null-assertion': 'warn',
      '@typescript-eslint/no-inferrable-types': 'warn',
      '@typescript-eslint/no-unnecessary-condition': 'warn',
      '@typescript-eslint/prefer-optional-chain': 'warn',
      '@typescript-eslint/prefer-nullish-coalescing': 'warn',

      // Accessibility rules
      'jsx-a11y/alt-text': 'warn',
      'jsx-a11y/anchor-has-content': 'warn',
      'jsx-a11y/anchor-is-valid': 'warn',
      'jsx-a11y/aria-props': 'warn',
      'jsx-a11y/aria-role': 'warn',
      'jsx-a11y/role-has-required-aria-props': 'warn',
      'jsx-a11y/click-events-have-key-events': 'warn', // Ensure interactive elements are keyboard accessible
      'jsx-a11y/no-static-element-interactions': 'warn', // Avoid non-interactive elements with event handlers
      'jsx-a11y/no-noninteractive-element-interactions': 'warn', // Avoid interactions on non-interactive elements
      'jsx-a11y/aria-unsupported-elements': 'warn', // Ensure ARIA attributes are used correctly
      'jsx-a11y/heading-has-content': 'warn', // Ensure headings have content
      'jsx-a11y/media-has-caption': 'warn', // Ensure media elements have captions
      'jsx-a11y/no-autofocus': 'warn', // Avoid using autoFocus
      'jsx-a11y/tabindex-no-positive': 'warn', // Avoid positive tabIndex values
      'jsx-a11y/label-has-associated-control': [
        'warn',
        {
          labelComponents: ['Label'],
          labelAttributes: ['label'],
          controlComponents: ['Input'],
          depth: 3,
        },
      ],

      // Formatting
      'eol-last': ['error', 'always'],
      'linebreak-style': ['error', 'unix'],
      quotes: ['error', 'single', { avoidEscape: true }],
      semi: ['error', 'always'],

      // Best Practices
      'default-case': 'warn', // Require default cases in switch statements
      'no-alert': 'warn', // Disallow use of `alert`, `confirm`, and `prompt`
      'no-shadow': 'warn', // Disallow variable declarations from shadowing outer scope variables
      'no-use-before-define': ['error', { functions: false, classes: true }],
      'prefer-const': 'error', // Prefer `const` over `let` when variables are not reassigned
      'no-var': 'error', // Disallow use of `var`
      'prefer-template': 'warn', // Prefer template literals over string concatenation
      'no-implicit-coercion': 'warn', // Avoid shorthand type conversions

      // Naming Conventions
      '@typescript-eslint/naming-convention': [
        'error',
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
