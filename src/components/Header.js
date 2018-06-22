import React from 'react'
import {get} from 'lodash'
import {compose} from 'redux'
import {connect} from 'react-redux'
import {withStyles} from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import EditableCell from './EditableCell'

const styles = (theme) => ({})

const Header = ({path, data, side, activeCell, classes}) => (
  <Table className={classes.table}>
    <TableBody>
      {side.map((val, i) => (
        <TableRow key={i}>
          <TableCell>{val}</TableCell>
          <EditableCell path={`${path}.data[${i}]`} />
        </TableRow>
      ))}
    </TableBody>
  </Table>
)

export default compose(
  withStyles(styles),
  connect((state, props) => ({
    side: get(state, `${props.path}.side`),
    data: get(state, `${props.path}.data`),
    activeCell: state.activeCellPath,
  }))
)(Header)
