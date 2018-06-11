import React from 'react'
import {withRouter} from 'react-router-dom'
import {compose} from 'redux'
import {connect} from 'react-redux'
import {withDataProviders} from 'data-provider'
import {resourceProvider} from '../dataProviders'
import {resourceSelector} from '../selectors'

const Resource = ({resource}) => <div>{resource.id}</div>

export default compose(
  withRouter,
  withDataProviders((props) => {
    return [resourceProvider(props.match.params.id)]
  }),
  connect((state, props) => ({
    resource: resourceSelector(state, props),
  }))
)(Resource)
