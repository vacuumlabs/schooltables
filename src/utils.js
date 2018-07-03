import {set} from 'lodash'
import produce from 'immer'
import {unparse} from 'papaparse'

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

// https://github.com/mholt/PapaParse
export const unparseTables = (tables) =>
  tables.map((t) => {
    let {header, data} = t
    if (t.side) {
      data = data.map((row, i) => (Array.isArray(row) ? [t.side[i], ...row] : [t.side[i], row]))
    }
    return unparse({
      fields: header,
      data,
    })
  })

// Function to download data to a file
//https://stackoverflow.com/questions/13405129/javascript-create-and-save-file
export function download(data, filename, type) {
  const file = new Blob([data], {type})
  if (window.navigator.msSaveOrOpenBlob) {
    // IE10+
    window.navigator.msSaveOrOpenBlob(file, filename)
  } else {
    // Others
    let a = document.createElement('a'),
      url = URL.createObjectURL(file)
    a.href = url
    a.download = filename
    document.body.appendChild(a)
    a.click()
    setTimeout(() => {
      document.body.removeChild(a)
      window.URL.revokeObjectURL(url)
    }, 0)
  }
}

export const downloadCsv = (tables, title) => {
  download(unparseTables(tables).join('\r\n'), title, 'csv')
}
