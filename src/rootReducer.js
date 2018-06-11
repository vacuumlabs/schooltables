import {get} from 'lodash'
import getInitialState from './state'
import {immutableSet} from './utils'

/*
 * Forward reducer transform to a particular state path.
 * If the last path element does not exist, reducer will get undefined
 * so that you can use reduce(state=initialState(), payload) => ...
 *
 * Does not create new state if the value did not change
 */
const forwardReducerTo = (reducer, path) => (state, payload) => {
  const value = path ? get(state, path) : state
  const newValue = reducer(value, payload)
  return newValue !== value ? immutableSet(state, path, newValue) : state
}

const rootReducer = (state = getInitialState(), action) => {
  const {reducer, path, payload} = action
  // fallback for 3rd-party actions
  if (!reducer) return state
  return forwardReducerTo(reducer, path)(state, payload)
}

export default rootReducer
