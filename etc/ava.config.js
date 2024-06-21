export default {
  'files': [
    'tests/**/*.ts',
  ],
  'typescript': {
    rewritePaths: {
      'tests/': 'dist/tests/',
    },
    compile: 'tsc',
  },
};
