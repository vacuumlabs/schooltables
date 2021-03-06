import {
  mappingFn as defaultMappingFn,
  createEmptyRectangularData,
  validateCreateTable,
} from './utils'
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

export const clearCreateData = () => ({
  type: 'Clear create data',
  path: 'create',
  reducer: (create) => getInitialState().create,
})

export const clearStoredData = (path) => ({
  type: 'Clear stored data',
  path,
  reducer: (survey) => {
    window.localStorage.removeItem(path)
    const tables = survey.tables.map((table) => {
      switch (table.type) {
        case 'header':
          return {
            ...table,
            data: table.side.map((_) => ''),
          }
        case 'standard':
          return {
            ...table,
            data: createEmptyRectangularData(table.header.length),
          }
        case 'rectangular':
          return {
            ...table,
            data: createEmptyRectangularData(table.header.length - 1, table.side.length),
          }
        default:
          return table
      }
    })
    return {
      ...survey,
      done: false,
      tables,
    }
  },
})

export const loadOrClearSurvey = (path) => ({
  type: 'Load from store or reset',
  path,
  reducer: (survey) => {
    const saved = window.localStorage.getItem(path)
    const surveyToUse = saved ? JSON.parse(saved) : survey
    // always clear 'create' survey
    if (path !== 'create' && saved) return {...survey, ...JSON.parse(saved)}
    const tables = surveyToUse.tables.map((table) => {
      switch (table.type) {
        case 'header':
          return {
            ...table,
            data: table.side.map((_) => ''),
          }
        case 'standard':
          return {
            ...table,
            data: createEmptyRectangularData(table.header.length),
          }
        case 'rectangular':
          return {
            ...table,
            data: createEmptyRectangularData(table.header.length - 1, table.side.length),
          }
        default:
          return table
      }
    })
    return {
      ...surveyToUse,
      tables,
    }
  },
})

export const addRectangular = () => ({
  type: 'Add Rectangular table',
  path: 'create.tables',
  reducer: (tables) => tables.concat(emptyRectangular),
})

export const addStandard = () => ({
  type: 'Add Standard table',
  path: 'create.tables',
  reducer: (tables) => tables.concat(emptyStandard),
})

// TODO this and other dialogs
export const setError = () => ({})

// TODO helper func
export const clearSurveyData = (path) => ({
  type: 'Generate data from header/side',
  path,
  reducer: (survey) => {
    const tables = survey.tables.map((table) => {
      switch (table.type) {
        case 'header':
          return {
            ...table,
            data: table.side.map((_) => ''),
          }
        case 'standard':
          return {
            ...table,
            data: createEmptyRectangularData(table.header.length),
          }
        case 'rectangular':
          return {
            ...table,
            data: createEmptyRectangularData(table.header.length - 1, table.side.length),
          }
        default:
          return table
      }
    })
    return {
      ...survey,
      tables,
    }
  },
})

// only possible on create, index is for tables arr
export const addColumn = (i) => ({
  type: `Add column to table ${i}`,
  path: `create.tables[${i}].header`,
  reducer: (header) => header.concat(''),
})

export const addColumnOnPath = (path) => ({
  type: `Add column to table ${path}`,
  path: `${path}.header`,
  reducer: (header) => header.concat(''),
})

export const addRowOnPathCreate = (path) => ({
  type: `Add column to table ${path}`,
  path: `${path}.side`,
  reducer: (side) => side.concat(''),
})

export const addRowOnPathSurvey = (path) => ({
  type: `Add row to table ${path}`,
  path,
  reducer: (data) => data.concat([[...Array(data[0].length)].map((c) => '')]),
})

export const removeIndexOnPath = (i, path) => ({
  type: `Remove idx ${i} in ${path}`,
  path,
  reducer: (arr) => {
    const newArr = arr.slice()
    newArr.splice(i, 1)
    return newArr
  },
})

export const login = (pushHistory, name, password) => async (dispatch, getState) => {
  dispatch(updateValue('loginError', ''))
  try {
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
      dispatch(updateValue('loginError', 'Nespravne udaje'))
    }
  } catch (e) {
    console.log(e)
  }
}

export const submitCreate = (pushHistory) => async (dispatch, getState) => {
  dispatch(clearSurveyData('create'))
  try {
    const res = await fetch(`${process.env.REACT_APP_API_URL || ''}/admin/create`, {
      method: 'POST',
      headers: new Headers({
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-Token': window.localStorage.getItem('token'),
      }),
      body: JSON.stringify(validateCreateTable(getState().create)),
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
      headers: new Headers({
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-Token': window.localStorage.getItem('token'),
      }),
      body: JSON.stringify(getState()[id].tables),
    })
    if (res.ok) {
      dispatch(updateValue([id, 'done'], true))
    } else {
      console.log(res.status)
      console.log(res.statusText)
    }
  } catch (e) {
    console.log('or catch')
    console.log(e)
  }
}

export const updateLocked = (id, locked) => async (dispatch, getState) => {
  try {
    const res = await fetch(`${process.env.REACT_APP_API_URL || ''}/admin/lock`, {
      method: 'POST',
      headers: new Headers({
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-Token': window.localStorage.getItem('token'),
      }),
      body: JSON.stringify({
        id,
        locked,
      }),
    })
    if (res.ok) {
      getState().surveyList[id] && dispatch(updateValue(['surveyList', id, 'locked'], locked))
      getState().results[id] && dispatch(updateValue(['results', id, 'locked'], locked))
    } else {
      console.log(res.status)
      console.log(res.statusText)
    }
  } catch (e) {
    console.log(e)
  }
}

export const updateArchived = (id, archived) => async (dispatch) => {
  try {
    const res = await fetch(`${process.env.REACT_APP_API_URL || ''}/admin/archive`, {
      method: 'POST',
      headers: new Headers({
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-Token': window.localStorage.getItem('token'),
      }),
      body: JSON.stringify({
        id,
        archived,
      }),
    })
    if (res.ok) {
      dispatch(updateValue(['surveyList', id, 'archived'], archived))
    } else {
      console.log(res.status)
      console.log(res.statusText)
    }
  } catch (e) {
    console.log(e)
  }
}

// TODO warn that this clears in progress survey creation
export const copySurvey = (id, pushHistory) => async (dispatch) => {
  try {
    dispatch(clearSurveyData('create'))
    window.localStorage.removeItem('create')
    const res = await fetch(`${process.env.REACT_APP_API_URL || ''}/api/survey/${id}`, {
      method: 'GET',
    })
    if (res.ok) {
      dispatch(updateValue(['create'], validateCreateTable(await res.json())))
      pushHistory('/create')
    } else {
      console.log(res.status)
      console.log(res.statusText)
    }
  } catch (e) {
    console.log(e)
  }
}
