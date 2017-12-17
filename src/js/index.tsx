/// <reference path="./index.d.ts" />

import 'babel-polyfill'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { AppContainer} from 'react-hot-loader'
import App from './components/App'
import getStore from './redux/getStore'
import { Provider } from 'react-redux'
import './core/browserShim'
import { csInterface } from './core'

declare global {
  interface NodeModule {
    hot: any;
  }
  interface Window {
    nodeRequire: any;
    didSetupHandlers: boolean;
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any;
    __REDUX_DEVTOOLS_EXTENSION__: any;
    __adobe_cep__: any;
  }
}

window.localStorage.debug = '*'

// only add listeners when not already added (livereload)
if (!window.didSetupHandlers) {
  // handle console.log / console.error events from JSX
  csInterface.addEventListener('CONSOLE_LOG', (e) => {
    console.log.apply(console, e.data)
  })
  csInterface.addEventListener('CONSOLE_WARN', (e) => {
    console.warn.apply(console, e.data)
  })
  csInterface.addEventListener('CONSOLE_ERROR', (e) => {
    console.error.apply(console, e.data)
  })
}
window.didSetupHandlers = true

function evalJsx(code: string): Promise<void> {
  return new Promise(resolve => {
    window.__adobe_cep__.evalScript(code, () => resolve())
  })
}

function loadJsx(): void {
  // this require is needed for the brfs transform module
  const fs = require('fs')
  // this fs.readFileSync will be replaced with the contents of the bundle file by brfs
  // the JSX_BUNDLE_PATH environment variable is provided by the bundler
  // will be replaced with the actual value by the envify module
  const contents = fs.readFileSync(process.env.JSX_BUNDLE_PATH, 'utf8')
  evalJsx(contents)
}

function getAppEl() {
  let appEl = document.getElementById('app')
  if (!appEl) {
    appEl = document.createElement('div')
    appEl.id = 'app'
    appEl.style.width = '100%'
    appEl.style.height = '100%'
    appEl.style.backgroundColor = '#ffffff'
    document.body.appendChild(appEl)
  }
  return appEl
}

loadJsx()

ReactDOM.render(
  <AppContainer>
    <Provider store={getStore()}>
      <App />
    </Provider>
  </AppContainer>,
  getAppEl()
)
