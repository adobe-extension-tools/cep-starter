import { Store, createStore, applyMiddleware } from 'redux'
import { reducers, RootState } from './index'
// import { composeWithDevTools } from 'remote-redux-devtools'
import AppMiddleware from './middlewares/appMiddleware'

let store: Store<RootState>

export default function getStore() {
  if (!store) {
    // const composeEnhancers = composeWithDevTools({
    //   realtime: true
    // })
    store = createStore(
      reducers,
      applyMiddleware(
        AppMiddleware()
      )
    )
  }
  return store
}

if (module && module.hot) {
  module.hot.onUpdate(() => {
    store.replaceReducer(require('./index').reducers)
    return true
  })
}
