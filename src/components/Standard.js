import React from 'react'
import {get} from 'lodash'
import {compose} from 'redux'
import {connect} from 'react-redux'
import {withStyles} from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import IconButton from '@material-ui/core/IconButton'
import AddIcon from '@material-ui/icons/Add'
import CellRow from './CellRow'
import {addRow} from '../actions'

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
    right: '-20px',
  },
})

const CreateStandard = ({path, data, addRow}) => (
  <Table className={this.props.classes.table}>
    <TableHead>
      <TableRow>
        <CellRow path={`${path}.header`} editable={false} />
      </TableRow>
    </TableHead>
    <TableBody>
      {data.map((row, i) => (
        <TableRow key={i}>
          <CellRow path={`${path}.data[${i}]`} />
        </TableRow>
      ))}
    </TableBody>
    <IconButton className={this.props.iconButton} onClick={addRow}>
      <AddIcon />
    </IconButton>
  </Table>
)

export default compose(
  withStyles(styles),
  connect(
    (state, props) => ({
      data: get(state, `${props.path}.header`),
    }),
    {addRow}
  )
)(CreateStandard)
