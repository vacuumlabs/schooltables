import React, {Fragment} from 'react'
import {compose} from 'redux'
import {connect} from 'react-redux'
import {drop} from 'lodash'
import {withProps} from 'recompose'
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

const styles = (theme) => ({})

const Results = ({path, results, classes, id}) => {
  const {data, header, rectHeaders, rects} = results
  console.log(results)
  return (
    <Paper>
      <Title path={path} />
      Blah blah {`${window.location.host}/survey/${id}`}
      <Table>
        <TableHead>
          <TableRow>{header.map((c, i) => <TableCell key={i}>{c}</TableCell>)}</TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, i) => (
            <TableRow key={i}>{row.map((c, i) => <TableCell key={i}>{c}</TableCell>)}</TableRow>
          ))}
        </TableBody>
      </Table>
      {rects.map((rectArr, i) => (
        <Fragment key={`rectArr_${i}`}>
          <Table>
            <TableBody>
              {rectHeaders.map((row, i) => (
                <TableRow key={`headerRow_${i}`}>
                  <TableCell>{row[0]}</TableCell>
                  <TableCell>{row[1]}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {rectArr.map((rect, i) => (
            <Table key={`rect_${i}`}>
              <TableHead>
                <TableRow>
                  <TableCell />
                  {rect[0].map((c, i) => <TableCell key={i}>{c}</TableCell>)}
                </TableRow>
              </TableHead>
              <TableBody>
                {drop(rect, 1).map((row, i) => (
                  <TableRow key={`_${i}`}>
                    <TableCell key={i}>{row[0]}</TableCell>
                    {drop(row, 1).map((c, i) => <TableCell key={i}>{c}</TableCell>)}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ))}
        </Fragment>
      ))}
      <a href={`${process.env.REACT_APP_API_URL}/admin/csv/${id}`}>
        <Button variant="outlined" className={classes.button}>
          <ArrowDownward className={classes.leftIcon} />
          Stiahnut .csv
        </Button>
      </a>
    </Paper>
  )
}

export default compose(
  withStyles(styles),
  withRouter,
  withProps((props) => ({id: paramsIdSelector(undefined, props)})),
  withDataProviders((props) => {
    return [resultsProvider(props.id)]
  }),
  connect((state, props) => ({
    results: resultsSelector(state, props),
  }))
)(Results)
