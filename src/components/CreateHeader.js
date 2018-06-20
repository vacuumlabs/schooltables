import React from 'react'
import {get} from 'lodash'
import {compose} from 'redux'
import {connect} from 'react-redux'
import {withStyles} from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import IconButton from '@material-ui/core/IconButton'
import AddIcon from '@material-ui/icons/Add'
import EditableCell from './EditableCell'
import {addColumn} from '../actions'

const styles = (theme) => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
  iconButton: {
    position: 'absolute',
    bottom: '-20px',
  },
})

const CreateHeader = ({path, data, activeCell, addColumn, classes}) => (
  <Table className={classes.table}>
    <TableBody>
      {data.map((_, i) => (
        <TableRow key={i}>
          <EditableCell
            key={i}
            path={`${path}.side[${i}]`}
            active={activeCell === `${path}.side[${i}]`}
          />
          <TableCell key={i}>...</TableCell>
        </TableRow>
      ))}
    </TableBody>
    <IconButton className={classes.iconButton} onClick={addColumn}>
      <AddIcon />
    </IconButton>
  </Table>
)

export default compose(
  withStyles(styles),
  connect(
    (state, props) => ({
      data: get(state, `${props.path}.side`),
      activeCell: state.activeCellPath,
    }),
    {addColumn}
  )
)(CreateHeader)
