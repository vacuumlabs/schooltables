import {mappingFn as defaultMappingFn} from './utils'

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
