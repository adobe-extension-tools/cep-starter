import * as React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {
  actionCreators as appActionCreators,
  AppState,
  AppActionCreators
} from '../redux/modules/app'
import {
  actionCreators as routerActionCreators,
  RouterState,
  RouterActionCreators
} from '../redux/modules/router'

interface AppProps {
  app: AppState;
  router: RouterState;
  actions: AppActionCreators & RouterActionCreators;
}

class App extends React.Component<AppProps, any> {
  render() {
    const { app, router, actions } = this.props
    const { increment, decrement, push, pop } = actions
    const { count } = app
    return (
      <div>
        <h1>{count}</h1><br />
        <a onClick={() => push('test')}>go to test</a><br />
        <a onClick={() => pop()}>pop</a><br />
        <a onClick={() => increment(1)}>increment</a><br />
        <a onClick={() => decrement(1)}>decrement</a>
        <div>{JSON.stringify(router.navStack)}</div>
      </div>
    )
  }
}

export default connect(
  state => state,
  dispatch => ({
    actions: bindActionCreators({
      ...appActionCreators,
      ...routerActionCreators
    }, dispatch)
  })
)(App as any)
