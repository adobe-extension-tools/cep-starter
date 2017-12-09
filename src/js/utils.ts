export function nodeRequire<T = any>(libPath: string): T {
  // save browserify / webpack's require
  const originalRequire = require
  // replace it with the actual node require
  require = window.nodeRequire
  // load the module
  const lib = window.nodeRequire(libPath)
  // put the original require back
  require = originalRequire
  // return the library
  return lib
}