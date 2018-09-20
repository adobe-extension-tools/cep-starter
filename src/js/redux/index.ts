import { combineReducers, Reducer } from 'redux'
import { reducer as appReducer, AppState } from './modules/app'
import { reducer as routerReducer, RouterState } from './modules/router'

export interface RootState {
  readonly app: AppState
  readonly router: RouterState
}

export const reducers: Reducer<RootState> = combineReducers({
  app: appReducer,
  router: routerReducer
})
