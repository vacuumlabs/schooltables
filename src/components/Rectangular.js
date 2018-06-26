import React from 'react'
import {get} from 'lodash'
import {compose} from 'redux'
import {connect} from 'react-redux'
import {withStyles} from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableHead from '@material-ui/core/TableHead'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import EditableCell from './EditableCell'

const styles = (theme) => ({})

const Rectangular = ({path, header, side, classes, data, editable}) => (
  <Table>
    <TableHead>
      <TableRow>
        <TableCell />
        {header.map((c, i) => <TableCell key={i}>{c}</TableCell>)}
      </TableRow>
    </TableHead>
    <TableBody>
      {side.map((c, i) => (
        <TableRow key={`_${i}`}>
          <TableCell key={i}>{c}</TableCell>
          {data[i].map((_, j) => (
            <EditableCell
              key={`edit_${j}`}
              path={`${path}.data[${i}]`}
              index={j}
              editable={editable}
            />
          ))}
        </TableRow>
      ))}
    </TableBody>
  </Table>
)

export default compose(
  withStyles(styles),
  connect((state, props) => ({
    header: get(state, `${props.path}.header`),
    side: get(state, `${props.path}.side`),
    data: get(state, `${props.path}.data`),
  }))
)(Rectangular)
