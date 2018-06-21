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

const styles = (theme) => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {},
  iconButton: {
    position: 'absolute',
    bottom: '-20px',
  },
})

const CreateHeader = ({path, data, activeCell, addRow, classes}) => (
  <Fragment>
    <Table className={classes.table}>
      <TableBody>
        {data.map((_, i) => (
          <TableRow key={i}>
            <EditableCell key={`edit_${i}`} path={`${path}.side[${i}]`} />
          </TableRow>
        ))}
      </TableBody>
    </Table>
    <IconButton onClick={addRow}>
      <AddIcon />
    </IconButton>
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
