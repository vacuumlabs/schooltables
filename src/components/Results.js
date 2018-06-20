import React from 'react'
import {compose} from 'redux'
import {connect} from 'react-redux'
import {withRouter, Link} from 'react-router-dom'
import {withDataProviders} from 'data-provider'
import {paramsIdSelector, resultsSelector} from '../selectors'
import {resultsProvider} from '../dataProviders'
import {withStyles} from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Button from '@material-ui/core/Button'
import ArrowDownward from '@material-ui/icons/ArrowDownward'
import Paper from '@material-ui/core/Paper'
import Title from './Title'
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

// result = {
//   title: string,
//   link: string,
//   downloadCsv: string,
//   header: [],
//   data: [[]]
// }

const Results = ({path, data, classes, link, downloadCsv}) => {
  return (
    <Paper className={this.props.classes.root}>
      <Title path={path} />
      {link}
      <Table className={this.props.classes.table}>
        <TableHead>
          <TableRow>
            <CellRow path={`${path}.header`} editable={false} />
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, i) => (
            <TableRow key={i}>{row.map((c, i) => <TableCell key={i}>{c}</TableCell>)}</TableRow>
          ))}
        </TableBody>
        <Link to={downloadCsv}>
          <Button variant="outlined" className={classes.button}>
            <ArrowDownward className={classes.leftIcon} />
            Stiahnut .csv
          </Button>
        </Link>
      </Table>
    </Paper>
  )
}

export default compose(
  withStyles(styles),
  withRouter,
  withDataProviders((props) => {
    return [resultsProvider(paramsIdSelector(undefined, props))]
  }),
  connect((state, props) => ({
    results: resultsSelector(state, props),
  }))
)(Results)
