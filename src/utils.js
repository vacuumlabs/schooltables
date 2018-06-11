import {set} from 'lodash'
import produce from 'immer'

export const immutableSet = (obj, path, value) =>
  path && path.length
    ? produce((obj) => {
      set(obj, path, value)
    })(obj)
    : value
