import React from 'react'
import {get} from 'lodash'
import {compose} from 'redux'
import {connect} from 'react-redux'
import {withHandlers} from 'recompose'
import {withStyles} from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableHead from '@material-ui/core/TableHead'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import IconButton from '@material-ui/core/IconButton'
import AddIcon from '@material-ui/icons/Add'
import EditableCell from './EditableCell'
import {addRowOnPathSurvey} from '../actions'
import {tableContainer, surveyTable} from '../styles'

const styles = (theme) => ({
  tableContainer,
  surveyTable,
})

const Standard = ({path, data, header, addRow, classes, editable, title}) => (
  <div className={classes.tableContainer}>
    {title && (
      <Typography variant="title" gutterBottom>
        {title}
      </Typography>
    )}
    <Table className={classes.surveyTable}>
      <TableHead>
        <TableRow>{header.map((c, i) => <TableCell key={i}>{c}</TableCell>)}</TableRow>
      </TableHead>
      <TableBody>
        {data.map((row, i) => (
          <TableRow key={`rowkey_${i}`}>
            {row.map((c, j) => (
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
      {editable && (
        <IconButton onClick={addRow}>
          <AddIcon />
        </IconButton>
      )}
    </Table>
  </div>
)

export default compose(
  withStyles(styles),
  connect(
    (state, props) => ({
      header: get(state, `${props.path}.header`),
      data: get(state, `${props.path}.data`),
      title: get(state, `${props.path}.title`),
    }),
    {addRowOnPathSurvey}
  ),
  withHandlers({
    addRow: ({path, addRowOnPathSurvey}) => () => addRowOnPathSurvey(`${path}.data`),
  })
)(Standard)
