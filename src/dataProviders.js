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
