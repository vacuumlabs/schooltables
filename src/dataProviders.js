import {receiveData} from './actions'

const dispatchReceivedData = (path, mappingFn, ...mappingFnArgs) => (ref, data, dispatch) => {
  dispatch(receiveData(path, data, ref, mappingFn, ...mappingFnArgs))
}

export const resourceProvider = (id) => ({
  ref: 'resource',
  getData: [
    fetch,
    `${process.env.REACT_APP_API_URL || ''}/api/resources/${id}`,
    {
      accept: 'application/json',
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
    },
  ],
  onData: [dispatchReceivedData, ['surveyList']],
})

export const surveyProvider = (id) => ({
  ref: `survey-${id}`,
  getData: [
    fetch,
    `${process.env.REACT_APP_API_URL || ''}/api/surveys/${id}`,
    {
      accept: 'application/json',
    },
  ],
  onData: [dispatchReceivedData, ['surveys']],
})

export const resultsProvider = (id) => ({
  ref: `results-${id}`,
  getData: [
    fetch,
    `${process.env.REACT_APP_API_URL || ''}/admin/results/${id}`,
    {
      accept: 'application/json',
    },
  ],
  onData: [dispatchReceivedData, ['results']],
})
