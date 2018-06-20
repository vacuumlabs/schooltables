import React from 'react'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import {compose} from 'redux'
import {connect} from 'react-redux'
import {get} from 'lodash'
import {withHandlers, withProps} from 'recompose'
import {updateValue, setActiveCell} from '../actions'

const Title = ({value, active, editable, onChange, setActive}) => (
  <Typography variant="display3" gutterBottom onClick={editable ? setActive : null}>
    {active ? (
      <TextField
        label={'Zadajte nazov'}
        value={value == null ? '' : value}
        margin="normal"
        onChange={onChange}
      />
    ) : (
      value
    )}
  </Typography>
)

export default compose(
  connect(
    (state, props) => ({
      stateValue: get(state, `${props.path}.title`),
    }),
    {updateValue, setActiveCell}
  ),
  withProps(({stateValue}) => ({value: stateValue == null ? '' : stateValue})),
  withHandlers({
    onChange: ({path, updateValue}) => (e) => updateValue(path, e.target.value),
    setActive: ({path, setActiveCell}) => (e) => setActiveCell(path),
  })
)(Title)
