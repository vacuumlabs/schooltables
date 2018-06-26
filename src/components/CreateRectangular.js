import React from 'react'
import {get} from 'lodash'
import {compose} from 'redux'
import {connect} from 'react-redux'
import {withHandlers} from 'recompose'
import {addColumnOnPath, addRowOnPathCreate, removeIndexOnPath} from '../actions'
import {withStyles} from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import IconButton from '@material-ui/core/IconButton'
import AddIcon from '@material-ui/icons/Add'
import EditableCell from './EditableCell'
import DeleteIcon from '@material-ui/icons/Delete'
import Tooltip from '@material-ui/core/Tooltip'

const styles = (theme) => ({})

const CreateRectangular = ({path, header, side, classes, addColumn, addRow, deleteTable}) => (
  <Table>
    <TableHead>
      <TableRow>
        <TableCell />
        {header.map((_, i) => (
          <EditableCell key={`edit_${i}`} path={`${path}.header`} index={i} showDelete editable />
        ))}
        <IconButton onClick={addColumn}>
          <AddIcon />
        </IconButton>
      </TableRow>
    </TableHead>
    <TableBody>
      {side.map((_, i) => (
        <TableRow key={`row_${i}`}>
          <EditableCell key={`cell_${i}`} path={`${path}.side`} index={i} showDelete editable />
          {header.map((_, i) => <TableCell key={`other_cell_${i}`}>...</TableCell>)}
        </TableRow>
      ))}
    </TableBody>
    <IconButton onClick={addRow}>
      <AddIcon />
    </IconButton>
    <Tooltip id="tooltip-icon" title="Delete">
      <IconButton aria-label="Delete" onClick={deleteTable}>
        <DeleteIcon />
      </IconButton>
    </Tooltip>
  </Table>
)

export default compose(
  withStyles(styles),
  connect(
    (state, props) => ({
      header: get(state, `${props.path}.header`),
      side: get(state, `${props.path}.side`),
    }),
    {addColumnOnPath, addRowOnPathCreate, removeIndexOnPath}
  ),
  withHandlers({
    addColumn: ({path, addColumnOnPath}) => () => addColumnOnPath(path),
    addRow: ({path, addRowOnPathCreate}) => () => addRowOnPathCreate(path),
    deleteTable: ({index, removeIndexOnPath}) => () => removeIndexOnPath(index, 'create.tables'),
  })
)(CreateRectangular)
