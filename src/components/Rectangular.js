import React from 'react'
import {get} from 'lodash'
import {compose} from 'redux'
import {connect} from 'react-redux'
import {withHandlers} from 'recompose'
import ReactDataSheet from 'react-datasheet'
import {withStyles} from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableHead from '@material-ui/core/TableHead'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import {updateValue} from '../actions'
import {spreadsheetSelector} from '../selectors'
import {tableContainer, surveyTable} from '../styles'

const styles = (theme) => ({
  tableContainer,
  surveyTable: {
    marginTop: 15,
    ...surveyTable,
  },
  headerCell: {
    fontWeight: 'bold',
    whiteSpace: 'pre !important',
    padding: '0.2rem 1rem !important',
    color: `${theme.palette.text.primary} !important`,
  },
  cell: {
    padding: '0.2rem 1rem !important',
  },
})

const Rectangular = ({path, header, side, classes, data, editable, title, onCellsChanged}) => (
  <div className={classes.tableContainer}>
    {title && (
      <Typography variant="title" gutterBottom>
        {title}
      </Typography>
    )}
    <ReactDataSheet
      className={classes.surveyTable}
      data={data}
      valueRenderer={(cell) => cell.value}
      onCellsChanged={onCellsChanged}
    />
  </div>
)

export default compose(
  withStyles(styles),
  connect(
    (state, props) => ({
      data: spreadsheetSelector(
        get(state, `${props.path}`),
        props.classes.headerCell,
        props.classes.cell
      ),
      title: get(state, `${props.path}.title`),
    }),
    {updateValue}
  ),
  withHandlers({
    onCellsChanged: ({updateValue, path, editable}) => (changes) => {
      changes.forEach(({cell, row, col, value}) => {
        if (!cell) return
        updateValue(`${path}.data[${row - 1}][${col - 1}]`, value)
      })
    },
  })
)(Rectangular)
