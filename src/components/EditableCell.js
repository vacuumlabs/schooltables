import React from 'react'
import {withStyles} from '@material-ui/core/styles'
import TableCell from '@material-ui/core/TableCell'
import TextField from '@material-ui/core/TextField'
import DeleteIcon from '@material-ui/icons/Delete'
import Tooltip from '@material-ui/core/Tooltip'
import IconButton from '@material-ui/core/IconButton'
import {compose} from 'redux'
import {connect} from 'react-redux'
import {get} from 'lodash'
import {withHandlers, withProps} from 'recompose'
import {updateValue, removeIndexOnPath} from '../actions'

const styles = (theme) => ({
  container: {
    display: 'inline-block',
    whiteSpace: 'nowrap',
  },
})

const EditableCell = ({
  value,
  onChange,
  onDelete,
  children,
  showDelete,
  editable,
  classes,
  label,
  placeholder,
}) => (
  <TableCell>
    <div className={classes.container}>
      {editable ? (
        <TextField
          value={value == null ? '' : value}
          margin="normal"
          onChange={onChange}
          label={label}
          placeholder={placeholder}
        />
      ) : (
        value
      )}
      {showDelete && (
        <Tooltip id="tooltip-icon" title="Delete">
          <IconButton aria-label="Delete" onClick={onDelete}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      )}
    </div>
  </TableCell>
)

export default compose(
  withStyles(styles),
  connect(
    (state, props) => ({
      stateValue: get(state, props.path)[props.index],
    }),
    {updateValue, removeIndexOnPath}
  ),
  withProps(({stateValue, path}) => ({value: stateValue == null ? '' : stateValue})),
  withHandlers({
    onChange: ({path, updateValue, index}) => (e) =>
      updateValue(`${path}[${index}]`, e.target.value),
    onDelete: ({path, removeIndexOnPath, index}) => (e) => removeIndexOnPath(index, path),
  })
)(EditableCell)
