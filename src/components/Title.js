import React from 'react'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import {compose} from 'redux'
import {connect} from 'react-redux'
import {get} from 'lodash'
import {withHandlers, withProps} from 'recompose'
import {updateValue, setActiveCell} from '../actions'

const Title = ({value, onChange}) => (
  <TextField
    label={'Zadajte nazov'}
    value={value == null ? '' : value}
    margin="normal"
    onChange={onChange}
  />
)

export default compose(
  connect(
    (state, props) => ({
      stateValue: get(state, `${props.path}.title`),
    }),
    {updateValue}
  ),
  withProps(({stateValue}) => ({value: stateValue == null ? '' : stateValue})),
  withHandlers({
    onChange: ({path, updateValue}) => (e) => updateValue(`${path}.title`, e.target.value),
  })
)(Title)
