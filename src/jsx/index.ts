import 'extendscript-es5-shim-ts'
import './console'

console.log('Hello world from JSX!')
console.warn('Warning from JSX!')
console.error('Test error from JSX!')

function run() {
  if (app.project.activeItem === null || !(app.project.activeItem instanceof CompItem)) return
  const comp = app.project.activeItem
  comp.name = 'Hello ExtendScript!'
}
run()