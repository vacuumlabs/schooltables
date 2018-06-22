import React, {Fragment} from 'react'
import {get} from 'lodash'
import {compose} from 'redux'
import {connect} from 'react-redux'
import {withHandlers} from 'recompose'
import {withStyles} from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import IconButton from '@material-ui/core/IconButton'
import AddIcon from '@material-ui/icons/Add'
import EditableCell from './EditableCell'
import {addRowOnPathCreate} from '../actions'

const styles = (theme) => ({})

const CreateHeader = ({path, data, activeCell, addRow, classes}) => (
  <Fragment>
    <Table>
      <TableBody>
        {data.map((_, i) => (
          <TableRow key={i}>
            <EditableCell key={`edit_${i}`} path={`${path}.side`} index={i} showDelete />
          </TableRow>
        ))}
      </TableBody>
      <IconButton onClick={addRow}>
        <AddIcon />
      </IconButton>
    </Table>
  </Fragment>
)

export default compose(
  withStyles(styles),
  connect(
    (state, props) => ({
      data: get(state, `${props.path}.side`),
    }),
    {addRowOnPathCreate}
  ),
  withHandlers({
    addRow: ({path, addRowOnPathCreate}) => () => addRowOnPathCreate(path),
  })
)(CreateHeader)
