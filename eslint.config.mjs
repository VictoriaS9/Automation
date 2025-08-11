// @ts-check
import playwright from 'eslint-plugin-playwright'

import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  eslint.configs.recommended,
 tseslint.configs.recommendedTypeChecked,
  {
    languageOptions: {
      parserOptions: {
        projectService:{
         allowDefaultProject: ["eslint.config.mjs"],
        },
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
    {
    rules:{
        '@typescript-eslint/no-explicit-any':'error',
        "@typescript-eslint/no-floating-promises": "error",
        'playwright/no-conditional-in-test': 'off'
    }
  },
   {
    ...playwright.configs['flat/recommended'],
    files: ['tests/**'],
    rules: {
      ...playwright.configs['flat/recommended'].rules,
      // Customize Playwright rules
      // ...
    },
  },
);