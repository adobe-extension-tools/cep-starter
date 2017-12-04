function run() {
  if (app.project.activeItem === null || !(app.project.activeItem instanceof CompItem)) return
  const comp = app.project.activeItem
  comp.name = 'Hello ExtendScript!'
}
run()
