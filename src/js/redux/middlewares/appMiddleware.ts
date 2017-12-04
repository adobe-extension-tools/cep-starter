import debug from 'debug'
import { Middleware, Action } from 'redux'
import { ActionTypes, TypeKeys } from '../modules/app'
const log = debug('appMiddleware')

export default function AppMiddleware(): Middleware {
  return store => dispatch => <A extends ActionTypes>(action: A) => {
    dispatch(action)
    switch(action.type) {
      case TypeKeys.INCREMENT:
        log('incrementing!')
    }
  }
}
