import React from 'react'
import TableCell from '@material-ui/core/TableCell'
import TextField from '@material-ui/core/TextField'
import {compose} from 'redux'
import {connect} from 'react-redux'
import {get} from 'lodash'
import {withHandlers, withProps} from 'recompose'
import {updateValue} from '../actions'

const EditableCell = ({value, onChange}) => (
  <TableCell>
    <TextField value={value == null ? '' : value} margin="normal" onChange={onChange} />
  </TableCell>
)

export default compose(
  connect(
    (state, props) => ({
      stateValue: get(state, props.path),
    }),
    {updateValue}
  ),
  withProps(({stateValue}) => ({value: stateValue == null ? '' : stateValue})),
  withHandlers({
    onChange: ({path, updateValue}) => (e) => updateValue(path, e.target.value),
  })
)(EditableCell)
