export default {
  'files': [
    'tests/**/*.ts',
  ],
  'extensions': {
    'ts': 'module',
  },
  'nodeArguments': [
    '--loader=ts-node/esm',
    '--experimental-specifier-resolution=node',
  ],
};
