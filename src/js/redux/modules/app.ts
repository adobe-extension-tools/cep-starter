import { Action, Reducer } from 'redux'

export interface AppState {
  readonly count: number;
}

const initialState: AppState = {
  count: 0
}

export enum TypeKeys {
  INCREMENT = 'INCREMENT',
  DECREMENT = 'DECREMENT'
}

export interface IncrementAction extends Action {
  type: TypeKeys.INCREMENT,
  amount: number
}

export interface DecrementAction extends Action {
  type: TypeKeys.DECREMENT,
  amount: number
}

export type ActionTypes = IncrementAction | DecrementAction

export const actionCreators = {
  increment(amount: number): IncrementAction {
    return {
      type: TypeKeys.INCREMENT,
      amount
    }
  },
  decrement(amount: number): DecrementAction {
    return {
      type: TypeKeys.DECREMENT,
      amount
    }
  }
}

export type AppActionCreators = typeof actionCreators

export const reducer: Reducer<AppState, ActionTypes> = (state = initialState, action) => {
  switch (action.type) {
    case TypeKeys.INCREMENT:
      return {
        count: state.count + action.amount
      }
    case TypeKeys.DECREMENT:
      return {
        count: state.count - action.amount
      }
    default:
      return state
  }
}
