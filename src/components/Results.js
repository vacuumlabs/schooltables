import React, {Fragment} from 'react'
import {compose} from 'redux'
import {connect} from 'react-redux'
import {branch, withHandlers, withProps} from 'recompose'
import {withRouter, Link} from 'react-router-dom'
import {withDataProviders} from 'data-provider'
import {get} from 'lodash'
import {submitSurvey, clearStoredData, loadOrClearSurvey} from '../actions'
import {paramsIdSelector, resultsSelector} from '../selectors'
import {resultsProvider} from '../dataProviders'
import {downloadCsv} from '../utils'
import {withStyles} from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Delete from '@material-ui/icons/Delete'
import Check from '@material-ui/icons/Check'
import Icon from '@material-ui/core/Icon'
import DownloadIcon from '@material-ui/icons/CloudDownload'
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
    marginBottom: 20,
  },
  button: {
    margin: theme.spacing.unit,
  },
  link: {
    display: 'block',
    marginBottom: 20,
  },
})

const Results = ({id, results, classes, saveCsv}) => {
  const {tables, title, note} = results
  const path = `results[${id}]`
  return (
    <div className={classes.root}>
      <Link to="/surveys">
        <Paper className={classes.paper}>
          <Typography>Návrat na zoznam dotazníkov.</Typography>
        </Paper>
      </Link>
      <Paper className={classes.paper}>
        <Typography variant="display2" gutterBottom>
          {title}
        </Typography>
        <Typography gutterBottom>Odkaz na dotazník: </Typography>
        <a href={`${window.location.origin}/survey/${id}`} className={classes.link}>
          <Typography variant="button" gutterBottom>
            {`${window.location.origin}/survey/${id}`}
          </Typography>
        </a>
        <Typography gutterBottom>{note}</Typography>
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
        <Button variant="contained" color="primary" className={classes.button} onClick={saveCsv}>
          Save .csv
          <DownloadIcon className={classes.rightIcon} />
        </Button>
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
  })),
  withProps(({results}) => ({
    saveCsv: () => downloadCsv(results.tables, `${results.title}.csv`),
  }))
)(Results)
