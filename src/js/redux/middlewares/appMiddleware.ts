import * as debug from 'debug'
import { Dispatch, Middleware, MiddlewareAPI } from 'redux'
import { TypeKeys, ActionTypes } from '../modules/app'
import { RootState } from '..'

const log = debug('appMiddleware')

export default function AppMiddleware(): Middleware {
  return (store: MiddlewareAPI<Dispatch, RootState>) =>
    (next) =>
    (action: ActionTypes): any => {
      if (action.type === TypeKeys.DECREMENT) {
        console.log('Decrementing...')
      } else if (action.type === TypeKeys.INCREMENT) {
        console.log('Incrementing...')
      }
      return next(action)
    }
}

