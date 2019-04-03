module.exports = {
  spec: 'src/test/**/*.spec.ts',
  extension: 'ts',
  reporter: 'nyan',
  require: [
    './mongoInMemory.js',
    'ts-node/register',
    './src/common/extensions/index.ts',
    './src/common/definitions/index.ts'
  ],
  timeout: 9999
}
