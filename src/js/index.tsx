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

const fs = window.nodeRequire('fs')

function evalJsx(code: string): Promise<void> {
  return new Promise(resolve => {
    window.__adobe_cep__.evalScript(code, () => resolve())
  })
}

function setJsxEnv(env: object): void {
  evalJsx(`$.global.env = ${JSON.stringify(env)}`)
}

function loadJsx(): void {
  const contents = fs.readFileSync('/PATH/TO/YOUR/cep-starter/bundle/index.jsx', 'utf8')
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

const hostEnv = JSON.parse(window.__adobe_cep__.getHostEnvironment())
setJsxEnv(hostEnv)
loadJsx()

ReactDOM.render(
  <AppContainer>
    <Provider store={getStore()}>
      <App />
    </Provider>
  </AppContainer>,
  getAppEl()
)
