import React from 'react'
import {get} from 'lodash'
import {compose} from 'redux'
import {connect} from 'react-redux'
import {withStyles} from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import IconButton from '@material-ui/core/IconButton'
import AddIcon from '@material-ui/icons/Add'
import CellRow from './CellRow'

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

const CreateStandard = ({path, data}) => (
  <Table className={this.props.classes.table}>
    <TableHead>
      <TableRow>
        <CellRow path={`${path}.header`} />
        <IconButton className={this.props.iconButton} onClick={this.props.addColumn}>
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
  connect((state, props) => ({
    data: get(state, `${props.path}.header`),
  }))
)(CreateStandard)
