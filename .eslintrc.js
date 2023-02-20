module.exports = {
    extends : [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
    ],
    parser : '@typescript-eslint/parser',
    plugins : ['@typescript-eslint'],
    parserOptions : {
        project : [
            './tsconfig.json',
            './packages/*/tsconfig.json',
            './examples/*/tsconfig.json',
        ],
        tsconfigRootDir : __dirname,
    },
    root : true,
    ignorePatterns : ['.eslintrc.js', 'dist'],
    rules : {
        'max-len' : ['warn', {ignoreComments : true}],
        'eol-last' : ['warn', 'always'],
        'key-spacing' : ['warn', {beforeColon : true}],
        'no-trailing-spaces' : ['warn', {ignoreComments : true}],

        'indent' : 'off',
        '@typescript-eslint/indent' : ['warn', 4, {
            FunctionDeclaration : {parameters : 1, body : 1},
            FunctionExpression : {parameters : 1, body : 1},
        }],
        'semi' : 'off',
        '@typescript-eslint/semi' : ['warn', 'always'],
        'quotes' : 'off',
        '@typescript-eslint/quotes' : ['warn', 'single'],
        'object-curly-spacing' : 'off',
        '@typescript-eslint/object-curly-spacing' : ['warn', 'never'],
        'comma-dangle' : 'off',
        '@typescript-eslint/comma-dangle' : ['warn', 'always-multiline'],

        '@typescript-eslint/type-annotation-spacing' : ['warn', {before : true, after : true}],
        '@typescript-eslint/interface-name-prefix' : 'off',
        '@typescript-eslint/explicit-function-return-type' : 'off',
        '@typescript-eslint/explicit-module-boundary-types' : 'off',
        '@typescript-eslint/no-explicit-any' : 'off',
    },
};