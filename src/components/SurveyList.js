import React from 'react'
import {compose} from 'redux'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {withDataProviders} from 'data-provider'
import {surveyListProvider} from '../dataProviders'
import {withStyles} from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'

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

const SurveyList = ({data}) => {
  return (
    <Paper className={this.props.classes.root}>
      <Table className={this.props.classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Datum</TableCell>
            <TableCell>Nazov</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, i) => (
            <TableRow key={i}>
              <TableCell>{row.date}</TableCell>
              <TableCell>
                <Link to={`/results/${row.id}`}>{row.title}</Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  )
}

export default compose(
  withStyles(styles),
  withDataProviders((props) => {
    return [surveyListProvider()]
  }),
  connect((state, props) => ({
    data: state.surveys,
  }))
)(SurveyList)
