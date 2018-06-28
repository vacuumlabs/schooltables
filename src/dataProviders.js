import {receiveData} from './actions'

const dispatchReceivedData = (path, mappingFn, ...mappingFnArgs) => (ref, data, dispatch) => {
  dispatch(receiveData(path, data, ref, mappingFn, ...mappingFnArgs))
}

const dummy = () => undefined

export const adminCheckProvider = () => ({
  ref: 'adminCheck',
  getData: [
    fetch,
    `${process.env.REACT_APP_API_URL || ''}/admin/check`,
    {
      headers: new Headers({
        'X-Token': window.localStorage.getItem('token'),
      }),
    },
  ],
  onData: [dummy],
})

export const resourceProvider = (id) => ({
  ref: 'resource',
  getData: [
    fetch,
    `${process.env.REACT_APP_API_URL || ''}/api/resources/${id}`,
    {
      accept: 'application/json',
      headers: new Headers({
        'X-Token': window.localStorage.getItem('token'),
      }),
    },
  ],
  onData: [dispatchReceivedData, ['resources']],
})

export const surveyListProvider = () => ({
  ref: 'surveyList',
  getData: [
    fetch,
    `${process.env.REACT_APP_API_URL || ''}/admin/surveys`,
    {
      accept: 'application/json',
      headers: new Headers({
        'X-Token': window.localStorage.getItem('token'),
      }),
    },
  ],
  onData: [dispatchReceivedData, ['surveyList']],
})

export const surveyProvider = (id) => ({
  ref: `survey-${id}`,
  getData: [
    fetch,
    `${process.env.REACT_APP_API_URL || ''}/api/survey/${id}`,
    {
      accept: 'application/json',
      headers: new Headers({
        'X-Token': window.localStorage.getItem('token'),
      }),
    },
  ],
  onData: [dispatchReceivedData],
})

export const resultsProvider = (id) => ({
  ref: `results-${id}`,
  getData: [
    fetch,
    `${process.env.REACT_APP_API_URL || ''}/admin/results/${id}`,
    {
      accept: 'application/json',
      headers: new Headers({
        'X-Token': window.localStorage.getItem('token'),
      }),
    },
  ],
  onData: [dispatchReceivedData, ['results']],
})
