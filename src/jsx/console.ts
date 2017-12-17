var xLib: ExternalObject
try {
  xLib = new ExternalObject("lib:\PlugPlugExternalObject")
} catch(err) {
  alert(`Missing ExternalObject: ${err.message}`)
}

// send an event to the CEP JavaScript VM
function dispatch(type: string, data: string) {
  if (!xLib) {
    return
  }
  var eventObj = new CSXSEvent()
  eventObj.type = type
  eventObj.data = data || ''
  eventObj.dispatch()
}

function log(type: string) {
  return (...args: any[]) => {
    var safeArgs = args.map(arg => {
      try {
        JSON.stringify(arg)
        return arg
      } catch (e) {
        return arg.toString()
      }
    })
    dispatch('CONSOLE_' + type, JSON.stringify(safeArgs))
  }
}

interface Console {
  log: (...args: any[]) => void
  warn: (...args: any[]) => void
  error: (...args: any[]) => void
}

interface Global {
  console: Console
}

declare var console: Console;

$.global.console = {
  log: log('LOG'),
  warn: log('WARN'),
  error: log('ERROR')
}