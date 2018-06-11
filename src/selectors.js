import {createSelector} from 'reselect'

export const paramsIdSelector = (_, props) => props.match.params.id || '0'

export const resourcesSelector = (state) => state.resources

export const resourceSelector = createSelector(
  paramsIdSelector,
  resourcesSelector,
  (id, resources) => resources[id]
)
