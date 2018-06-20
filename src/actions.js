import {mappingFn as defaultMappingFn, createEmptyRectangularData} from './utils'
import getInitialState, {emptyRectangular, emptyStandard} from './state'
import {get, omit} from 'lodash'

export const receiveData = (
  path,
  data,
  dataProviderRef,
  mappingFn = defaultMappingFn,
  ...mappingFnArgs
) => ({
  type: `Received data from ${dataProviderRef}`,
  path,
  payload: data,
  reducer: (state, data) => ({...state, ...mappingFn(data, ...mappingFnArgs)}),
})

export const updateValue = (path, data) => ({
  type: 'Update data on path',
  payload: data,
  path,
  reducer: (state, data) => data,
})

export const setActiveCell = (path) => ({
  type: 'Set active cell',
  payload: path,
  path: 'activeCellPath',
  reducer: () => path,
})

export const clearStoredData = (path) => ({
  type: 'Clear stored data',
  path,
  reducer: (state) => {
    window.localStorage.removeItem(path)
    return get(getInitialState(), path)
  },
})

export const loadOrClear = (path) => ({
  type: 'Load from store or reset',
  path,
  reducer: () => window.localStorage.getItem(path) || get(getInitialState(), path),
})

export const addRectangular = () => ({
  type: 'Add Rectangular table',
  path: 'create.tables',
  reducer: (tables) => tables.concat(emptyRectangular),
})

export const addStandard = () => ({
  type: 'Add Rectangular table',
  path: 'create.tables',
  reducer: (tables) => tables.concat(emptyStandard),
})

// TODO this and other dialogs
export const setError = () => ({})

export const generateEmptyData = (path) => ({
  type: 'Generate data from header/side',
  path,
  reducer: (table) => {
    let data
    switch (table.type) {
      case 'header':
        data = table.side.map((_) => '')
        break
      case 'standard':
        data = createEmptyRectangularData(table.header.length)
        break
      case 'Rectangular':
        data = createEmptyRectangularData(table.header.length, table.side.length)
        break
      default:
        console.log('generateEmptyData - should not happen')
    }
    return {
      ...table,
      data,
    }
  },
})

// only possible on create, index is for tables arr
export const addColumn = (i) => ({
  type: 'Add column to standard table',
  path: `create.tables[${i}].header`,
  reducer: (header) => header.concat(''),
})

export const addRow = (surveyId, tableId) => ({
  type: `Add row to table ${tableId}`,
  path: `${surveyId}.tables[${tableId}]`,
  reducer: (table) => ({
    ...table,
    data: table.data.concat([...Array(table.header.length)].map((c) => '')),
  }),
})

export const login = (pushHistory, name, password) => async (dispatch, getState) => {
  try {
    console.log(name, password)
    const res = await fetch(`${process.env.REACT_APP_API_URL || ''}/admin/login`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        password,
      }),
    })
    if (res.ok) {
      const body = await res.json()
      window.localStorage.setItem('token', body.token)
      pushHistory('/surveys')
    } else {
      console.log(res.status)
      console.log(res.statusText)
    }
  } catch (e) {
    console.log(e)
  }
}

export const submitCreate = (pushHistory) => async (dispatch, getState) => {
  try {
    const res = await fetch(`${process.env.REACT_APP_API_URL || ''}/api/create`, {
      method: 'POST',
      headers: new Headers({
        'X-Token': window.localStorage.getItem('token'),
      }),
      body: JSON.stringify(omit(getState().create, 'data')),
    })
    if (res.ok) {
      const body = await res.json()
      pushHistory(`/results/${body.id}`)
    } else {
      console.log(res.status)
      console.log(res.statusText)
    }
  } catch (e) {
    console.log(e)
  }
}

export const submitSurvey = (id, pushHistory) => async (dispatch, getState) => {
  try {
    const res = await fetch(`${process.env.REACT_APP_API_URL || ''}/api/submit/${id}`, {
      method: 'POST',
      body: getState()[id].data,
    })
    if (res.ok) {
      const body = await res.json()
      // TODO thankyou page
      pushHistory(`/thankyou/${body.id}`)
    } else {
      console.log(res.status)
      console.log(res.statusText)
    }
  } catch (e) {
    console.log(e)
  }
}
