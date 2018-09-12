import { Action, Reducer } from 'redux'

export interface RouterState {
  readonly navStack: string[];
}

const initialState: RouterState = {
  navStack: []
}

export enum TypeKeys {
  PUSH = 'PUSH',
  POP = 'POP'
}

export interface NavigatePush extends Action {
  type: TypeKeys.PUSH,
  page: string
}

export interface NavigatePop extends Action {
  type: TypeKeys.POP,
  amount: number
}

export type ActionTypes = NavigatePush | NavigatePop

export const actionCreators = {
  push(page: string): NavigatePush {
    return {
      type: TypeKeys.PUSH,
      page
    }
  },
  pop(amount: number = 1): NavigatePop {
    return {
      type: TypeKeys.POP,
      amount
    }
  }
}

export type RouterActionCreators = typeof actionCreators

export const reducer: Reducer<RouterState> = (state: RouterState = initialState, action) => {
  switch (action.type) {
    case TypeKeys.PUSH:
      return {
        navStack: [...state.navStack, action.page]
      }
    case TypeKeys.POP:
      return {
        navStack: [...state.navStack.slice(action.amount)]
      }
    default:
      return state
  }
}
