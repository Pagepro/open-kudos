module.exports = {
  spec: 'src/test/**/*.spec.ts',
  extension: 'ts',
  require: [
    './mongoInMemory.js',
    'ts-node/register',
    './src/common/extensions/index.ts',
    './src/common/definitions/index.ts',
    './@types/mongose-aggregate-paginate-v2/index.ts'
  ],
  timeout: 9999
}
