import React, {Fragment} from 'react'
import {compose} from 'redux'
import {connect} from 'react-redux'
import {branch, withHandlers, withProps} from 'recompose'
import {withRouter, Link} from 'react-router-dom'
import {withDataProviders} from 'data-provider'
import {get} from 'lodash'
import {root} from '../styles'
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
import ArrowBack from '@material-ui/icons/ArrowBack'
import Title from './Title'
import Header from './Header'
import Standard from './Standard'
import Rectangular from './Rectangular'
import ToggleLocked from './ToggleLocked'

const styles = (theme) => ({
  root,
  paper: {
    overflowX: 'auto',
    padding: '2rem',
    paddingTop: theme.spacing.unit * 2,
    marginBottom: 20,
    marginTop: 20,
  },
  button: {
    margin: theme.spacing.unit,
  },
  returnButton: {
    margin: theme.spacing.unit,
    position: 'absolute',
    top: 0,
    left: 0,
  },
  link: {
    display: 'block',
    marginBottom: 20,
  },
  leftIcon: {
    marginRight: theme.spacing.unit,
  },
  lockedTextContainer: {
    display: 'flex',
    alignItems: 'flex-end',
    color: 'red',
    fontWeight: 'bold',
  },
})

const Results = ({id, results, classes, saveCsv}) => {
  const {tables, title, note} = results
  const path = `results[${id}]`
  return (
    <div className={classes.root}>
      <Link to="/surveys">
        <Button className={classes.returnButton}>
          <ArrowBack className={classes.leftIcon} />
          Späť na zoznam
        </Button>
      </Link>
      <Paper className={classes.paper}>
        <Typography variant="display2" gutterBottom>
          {title}
        </Typography>
        <Typography gutterBottom className={classes.lockedTextContainer}>
          <ToggleLocked locked={results.locked} surveyId={id} /> Pre uzamknutý formulár nie je viac
          možné pridávať odpovede. Odomknite kliknutím na zámok.
        </Typography>
        <Typography gutterBottom>Odkaz na dotazník: </Typography>
        <a href={`${window.location.origin}/survey/${id}`} className={classes.link}>
          <Typography variant="caption" gutterBottom>
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
          <DownloadIcon className={classes.leftIcon} />
          Stiahnuť .csv
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
