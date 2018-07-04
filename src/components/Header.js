import React from 'react'
import {get} from 'lodash'
import {compose} from 'redux'
import {connect} from 'react-redux'
import {withStyles} from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import EditableCell from './EditableCell'
import {tableContainer, surveyTable} from '../styles'

const styles = (theme) => ({
  tableContainer,
  surveyTable,
})

const Header = ({path, data, side, activeCell, classes, editable}) => (
  <div className={classes.tableContainer}>
    <Typography variant="title" gutterBottom>
      Hlavička
    </Typography>
    <Table className={classes.surveyTable}>
      <TableBody>
        {side.map((val, i) => (
          <TableRow key={i}>
            <TableCell>{val}</TableCell>
            <EditableCell
              path={`${path}.data`}
              index={i}
              editable={editable}
              placeholder={'Prosím, vyplňte'}
            />
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </div>
)

export default compose(
  withStyles(styles),
  connect((state, props) => ({
    side: get(state, `${props.path}.side`),
    data: get(state, `${props.path}.data`),
    activeCell: state.activeCellPath,
  }))
)(Header)
