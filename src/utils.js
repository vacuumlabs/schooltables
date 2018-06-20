import {set} from 'lodash'
import produce from 'immer'

export const immutableSet = (obj, path, value) =>
  path && path.length
    ? produce((obj) => {
      set(obj, path, value)
    })(obj)
    : value

const normalizeObjBeforeMap = (data: Array<Object> | Object): Array<Object> =>
  Array.isArray(data) ? data : [data]

// obj handled as a single element of an array
export const mappingFn = (data: Array<Object> | Object, mapByProp?: number | string = 'id') =>
  normalizeObjBeforeMap(data).reduce((obj, current: {[string | number]: string | number}) => {
    obj[current[mapByProp]] = current
    return obj
  }, {})

export const mapArrayToId = (data: Array<Object>, id: number | string, mapByProp?: string) => ({
  [id]: mappingFn(data, mapByProp),
})

export const mapObjToId = (data: Object, id: number | string) => ({
  [id]: data,
})

export const validateRectangularData = (data, numColumns, numRows) => {
  if (numRows && data.length !== numRows) return false
  for (const row of data) {
    if (row.length !== numColumns) return false
  }
  return true
}

export const createEmptyRectangularData = (columns, rows = 1) => {
  const result = []
  for (let i = 0; i < rows; i++) {
    result.push([...Array(columns)].map((c) => ''))
  }
  return result
}
