import * as debug from 'debug'
import { Dispatch, Middleware, MiddlewareAPI } from 'redux'
import { TypeKeys } from '../modules/app'
import { RootState } from '..'

const log = debug('appMiddleware')

export default function AppMiddleware(): Middleware {
  return <RootState>(store: MiddlewareAPI<RootState>) =>
    (next: Dispatch<RootState>) =>
    (action: any): any => {
      const state = store.getState()
      if (action.type === TypeKeys.DECREMENT) {
        console.log('Decrementing...')
      } else if (action.type === TypeKeys.INCREMENT) {
        console.log('Incrementing...')
      }
      return next(action)
    }
}

