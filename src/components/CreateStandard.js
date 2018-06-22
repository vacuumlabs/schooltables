import React from 'react'
import {get} from 'lodash'
import {compose} from 'redux'
import {connect} from 'react-redux'
import {withStyles} from '@material-ui/core/styles'
import {withHandlers} from 'recompose'
import {addColumnOnPath, addRowOnPathCreate} from '../actions'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import IconButton from '@material-ui/core/IconButton'
import AddIcon from '@material-ui/icons/Add'
import CellRow from './CellRow'

const styles = (theme) => ({})

const CreateStandard = ({path, data, classes, addColumn}) => (
  <Table>
    <TableHead>
      <TableRow>
        <CellRow path={`${path}.header`} />
        <IconButton onClick={addColumn}>
          <AddIcon />
        </IconButton>
      </TableRow>
    </TableHead>
    <TableBody>
      <TableRow>{data.map((_, i) => <TableCell key={i}>...</TableCell>)}</TableRow>
    </TableBody>
  </Table>
)

export default compose(
  withStyles(styles),
  connect(
    (state, props) => ({
      data: get(state, `${props.path}.header`),
    }),
    {addColumnOnPath}
  ),
  withHandlers({
    addColumn: ({path, addColumnOnPath}) => () => addColumnOnPath(path),
  })
)(CreateStandard)
