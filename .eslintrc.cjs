module.exports = {
    root: true,
    env: { browser: true, es2020: true },
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/strict-type-checked',
        'plugin:react-hooks/recommended',
    ],
    ignorePatterns: ['dist', '.eslintrc.cjs'],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: ['./tsconfig.json', './tsconfig.node.json'],
        tsconfigRootDir: __dirname,
    },
    plugins: ['react-refresh'],
    rules: {
        'react-refresh/only-export-components': [
            'warn',
            { allowConstantExport: true },
        ],
        'quotes': ['error', 'single', { 'avoidEscape': true }],
    },
    settings: {
        'import/resolver': {
            alias: {
                map: [
                    ['@stores', './src/stores'],
                    ['@components', './src/components']
                ],
                extensions: ['.ts', '.tsx', '.css'],
            }
        },
    },
};
