import {createSelector} from 'reselect'

export const paramsIdSelector = (_, props) => props.match.params.id || '0'

export const paramsOrCreateSelector = (_, props) =>
  console.log(props.match.path) || props.match.path.indexOf('preview') !== -1
    ? 'create'
    : props.match.params.id

export const resourcesSelector = (state) => state.resources
export const surveysSelector = (state) => state.resources
export const allResultsSelector = (state) => state.resources

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
