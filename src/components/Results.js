import React, {Fragment} from 'react'
import {compose} from 'redux'
import {connect} from 'react-redux'
import {branch, withHandlers, withProps} from 'recompose'
import {withRouter} from 'react-router-dom'
import {withDataProviders} from 'data-provider'
import {get} from 'lodash'
import {submitSurvey, clearStoredData, loadOrClearSurvey} from '../actions'
import {paramsIdSelector, resultsSelector} from '../selectors'
import {resultsProvider} from '../dataProviders'
import {withStyles} from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Delete from '@material-ui/icons/Delete'
import Check from '@material-ui/icons/Check'
import Title from './Title'
import Header from './Header'
import Standard from './Standard'
import Rectangular from './Rectangular'

const styles = (theme) => ({
  root: {
    width: '100%',
    padding: 50,
  },
  paper: {
    overflowX: 'auto',
    padding: 20,
    paddingTop: theme.spacing.unit * 2,
  },
  button: {
    margin: 10,
  },
})

const Results = ({id, results, classes}) => {
  const {tables, title} = results
  const path = `results[${id}]`
  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Typography variant="display2" gutterBottom>
          {title}
        </Typography>
        {tables.map((t, i) => {
          const tablePath = `${path}.tables[${i}]`
          switch (t.type) {
            case 'header':
              return <Header key={`talbe_${i}`} path={tablePath} />
            case 'standard':
              return <Standard key={`talbe_${i}`} path={tablePath} />
            case 'rectangular':
              return <Rectangular key={`talbe_${i}`} path={tablePath} />
            default:
              return null
          }
        })}
      </Paper>
    </div>
  )
}

export default compose(
  withStyles(styles),
  withRouter,
  withProps((props) => ({id: paramsIdSelector(undefined, props)})),
  withDataProviders((props) => {
    return [resultsProvider(props.id, props.history.push)]
  }),
  connect((state, props) => ({
    results: resultsSelector(state, props),
  }))
)(Results)
