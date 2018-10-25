import React from 'react'
import {compose} from 'redux'
import {connect} from 'react-redux'
import {withHandlers} from 'recompose'
import {updateLocked} from '../actions'
import Lock from '@material-ui/icons/Lock'
import LockOpen from '@material-ui/icons/LockOpen'

const ToggleLocked = ({surveyId, locked, toggleLocked}) =>
  locked ? (
    <div className="clickable" title="Uzavrety" onClick={toggleLocked}>
      <Lock />
    </div>
  ) : (
    <div className="clickable" title="Otvoreny" onClick={toggleLocked}>
      <LockOpen />
    </div>
  )

export default compose(
  connect(
    null,
    {updateLocked}
  ),
  withHandlers({
    toggleLocked: ({updateLocked, surveyId, locked}) => () => updateLocked(surveyId, !locked),
  })
)(ToggleLocked)
