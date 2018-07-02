import React from 'react'
import {get} from 'lodash'
import {compose} from 'redux'
import {connect} from 'react-redux'
import {withStyles} from '@material-ui/core/styles'
import {withHandlers} from 'recompose'
import {addColumnOnPath, removeIndexOnPath} from '../actions'
import {tableContainer, surveyTable} from '../styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import IconButton from '@material-ui/core/IconButton'
import AddIcon from '@material-ui/icons/Add'
import EditableCell from './EditableCell'
import Title from './Title'
import DeleteIcon from '@material-ui/icons/Delete'
import Tooltip from '@material-ui/core/Tooltip'

const styles = (theme) => ({
  tableContainer,
  surveyTable,
})

const CreateStandard = ({path, header, data, classes, addColumn, deleteTable}) => (
  <div className={classes.tableContainer}>
    <Title path={path} xLarge />
    <Table className={classes.surveyTable}>
      <TableHead>
        <TableRow>
          {header.map((_, i) => (
            <EditableCell key={`edit_${i}`} path={`${path}.header`} index={i} showDelete editable />
          ))}
          <IconButton onClick={addColumn}>
            <AddIcon />
          </IconButton>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow>{header.map((_, i) => <TableCell key={i}>...</TableCell>)}</TableRow>
      </TableBody>
      <Tooltip id="tooltip-icon" title="Delete">
        <IconButton aria-label="Delete" onClick={deleteTable}>
          <DeleteIcon />
        </IconButton>
      </Tooltip>
    </Table>
  </div>
)

export default compose(
  withStyles(styles),
  connect(
    (state, props) => ({
      header: get(state, `${props.path}.header`),
    }),
    {addColumnOnPath, removeIndexOnPath}
  ),
  withHandlers({
    addColumn: ({path, addColumnOnPath}) => () => addColumnOnPath(path),
    deleteTable: ({index, removeIndexOnPath}) => () => removeIndexOnPath(index, 'create.tables'),
  })
)(CreateStandard)
