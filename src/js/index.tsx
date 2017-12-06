/// <reference path="./index.d.ts" />

import 'babel-polyfill'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { AppContainer} from 'react-hot-loader'
import App from './components/App'
import getStore from './redux/getStore'
import { Provider } from 'react-redux'
import './browserShim'

window.localStorage.debug = '*'

declare global {
  interface NodeModule {
    hot: any;
  }
  interface Window {
    nodeRequire: any;
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any;
    __REDUX_DEVTOOLS_EXTENSION__: any;
    __adobe_cep__: any;
  }
}

function evalJsx(code: string): Promise<void> {
  return new Promise(resolve => {
    window.__adobe_cep__.evalScript(code, () => resolve())
  })
}

function loadJsx(): void {
  // this require is needed for the brfs module
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
