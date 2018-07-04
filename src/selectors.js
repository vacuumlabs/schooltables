import {createSelector} from 'reselect'
import {get, identity} from 'lodash'
import {cell} from './styles'

export const paramsIdSelector = (_, props) => props.match.params.id || '0'

export const paramsOrCreateSelector = (_, props) =>
  props.match.path.indexOf('preview') !== -1 ? 'create' : props.match.params.id

export const entityOnPathSelector = (state, props) => get(state, props.path)

export const resourcesSelector = (state) => state.resources
// surveys on root
export const surveysSelector = (state) => state
export const allResultsSelector = (state) => state.results

export const surveySelector = createSelector(
  paramsOrCreateSelector,
  surveysSelector,
  (id, surveys) => surveys[id]
)

export const resultsSelector = createSelector(
  paramsIdSelector,
  allResultsSelector,
  (id, results) => ({
    ...results[id],
    link: `https://${window.location.host}/survey/${id}`,
    downloadCsv: `/admin/results/csv/${id}`,
  })
)

export const resourceSelector = createSelector(
  paramsIdSelector,
  resourcesSelector,
  (id, resources) => resources[id]
)

// not a 'state' selector, takes table, header and cell as args, used for memoization
export const spreadsheetSelector = createSelector(
  (table, header, cell) => table,
  (table, header, cell) => header,
  (table, header, cell) => cell,
  (table, headerClass, cellClass) => {
    const header = table.header.map((v) => ({
      value: v,
      readOnly: true,
      className: headerClass,
    }))
    let side = table.side
    let data = table.data.map(
      (row) =>
        Array.isArray(row)
          ? row.map((c) => ({value: c, className: cellClass}))
          : {value: row, className: cellClass}
    )
    if (side) {
      side = side.map((v) => ({value: v, readOnly: true, className: headerClass}))
      data = data.map((row, i) => (Array.isArray(row) ? [side[i], ...row] : [side[i], row]))
    }
    // assume data is an array of arrays
    return [header, ...data]
  }
)
