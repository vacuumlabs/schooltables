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
import Button from '@material-ui/core/Button'
import AddIcon from '@material-ui/icons/Add'
import EditableCell from './EditableCell'
import {addRowOnPathSurvey, updateValue} from '../actions'
import {spreadsheetSelector} from '../selectors'
import {tableContainer, surveyTable} from '../styles'

const styles = (theme) => ({
  tableContainer,
  surveyTable: {
    marginTop: 15,
    ...surveyTable,
  },
  leftIcon: {
    marginRight: theme.spacing.unit,
  },
  button: {
    marginTop: theme.spacing.unit * 2,
  },
  headerCell: {
    fontWeight: 'bold',
    padding: '0.2rem 1rem !important',
    color: `${theme.palette.text.primary} !important`,
  },
  cell: {
    padding: '0.2rem 1rem !important',
  },
})

const Standard = ({path, data, header, addRow, classes, editable, title, updateValue}) => (
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
      onCellsChanged={(changes) => {
        changes.forEach(({cell, row, col, value}) => {
          if (!cell) return
          updateValue(`${path}.data[${row - 1}][${col}]`, value)
        })
      }}
    />
    {editable && (
      <Button variant="contained" color="primary" className={classes.button} onClick={addRow}>
        <AddIcon /> Pridať riadok
      </Button>
    )}
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
    {addRowOnPathSurvey, updateValue}
  ),
  withHandlers({
    addRow: ({path, addRowOnPathSurvey}) => () => addRowOnPathSurvey(`${path}.data`),
  })
)(Standard)
