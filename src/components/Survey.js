import React, {Fragment} from 'react'
import {compose} from 'redux'
import {connect} from 'react-redux'
import {branch, withHandlers, withProps} from 'recompose'
import {withRouter, Link} from 'react-router-dom'
import {withDataProviders} from 'data-provider'
import {get} from 'lodash'
import {submitSurvey, clearStoredData, loadOrClearSurvey} from '../actions'
import {paramsOrCreateSelector} from '../selectors'
import {surveyProvider} from '../dataProviders'
import {downloadCsv} from '../utils'
import {withStyles} from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import Delete from '@material-ui/icons/Delete'
import Check from '@material-ui/icons/Check'
import Typography from '@material-ui/core/Typography'
import DownloadIcon from '@material-ui/icons/CloudDownload'
import Header from './Header'
import Standard from './Standard'
import Rectangular from './Rectangular'

const styles = (theme) => ({
  root: {
    width: '100%',
    padding: 50,
  },
  paper: {
    display: 'block',
    marginBottom: 20,
    padding: 20,
    paddingTop: theme.spacing.unit * 2,
  },
  button: {
    margin: 10,
  },
})

class Survey extends React.Component {
  constructor(props) {
    super(props)
    this.state = {loaded: false}
  }

  componentDidMount = () => {
    this.props.loadOrClearSurvey(paramsOrCreateSelector(undefined, this.props))
    this.setState({loaded: true})
  }

  componentDidUpdate = () => {
    const id = paramsOrCreateSelector(undefined, this.props)
    if (id !== 'create' && this.state.loaded) {
      console.log('passed create')
      console.log(this.props.data)
      console.log(JSON.stringify(this.props.data))
      window.localStorage.setItem(id, JSON.stringify(this.props.data))
    }
    return null
  }

  render = () => {
    if (!this.state.loaded) return null
    const {path, data, classes, submit, deleteSurvey, preview, saveCsv} = this.props
    const {tables, title, done, note} = data
    if (done) {
      return (
        <div className={classes.root}>
          <Paper className={classes.paper}>
            <Typography variant="subheading" gutterBottom>
              Dakujeme za vyplnenie formularu
            </Typography>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={saveCsv}
            >
              Save .csv
              <DownloadIcon className={classes.rightIcon} />
            </Button>
            <Button variant="outlined" className={classes.button} onClick={deleteSurvey}>
              <Delete className={classes.leftIcon} />
              Vyplnit novy formular
            </Button>
          </Paper>
        </div>
      )
    }
    return (
      <div className={classes.root}>
        {preview && (
          <Link to="/create">
            <Paper className={classes.paper}>
              <Typography gutterBottom>Náhľad práve vytváranej tabulky.</Typography>
              <Typography variant="button" gutterBottom>
                Kliknutím sa vrátite na pôvodnú obrazovku.
              </Typography>
            </Paper>
          </Link>
        )}
        <Paper className={classes.paper}>
          <Typography variant="display2" gutterBottom>
            {title}
          </Typography>
          <Typography gutterBottom>{note}</Typography>
          {tables.map((t, i) => {
            const tablePath = `${path}.tables[${i}]`
            switch (t.type) {
              case 'header':
                return <Header key={`talbe_${i}`} path={tablePath} editable />
              case 'standard':
                return <Standard key={`talbe_${i}`} path={tablePath} editable />
              case 'rectangular':
                return <Rectangular key={`talbe_${i}`} path={tablePath} editable />
              default:
                return null
            }
          })}
          {paramsOrCreateSelector(undefined, this.props) !== 'create' && (
            <div className={classes.button}>
              <Typography variant="subheading" gutterBottom>
                Dokoncit
              </Typography>
              <Button variant="outlined" className={classes.button} onClick={deleteSurvey}>
                <Delete className={classes.leftIcon} />
                Zmazat formular
              </Button>
              <Button variant="outlined" className={classes.button} onClick={submit}>
                <Check className={classes.leftIcon} />
                Dokoncit formular
              </Button>
            </div>
          )}
        </Paper>
      </div>
    )
  }
}

// TODO modals to confirm submit/delete
export default compose(
  withStyles(styles),
  withRouter,
  withProps((props) => ({id: paramsOrCreateSelector(undefined, props)})),
  branch(
    (props) => props.id !== 'create',
    withDataProviders((props) => {
      return [surveyProvider(props.id)]
    })
  ),
  connect(
    (state, props) => ({
      data: get(state, props.id),
      path: props.id,
      preview: props.id === 'create',
    }),
    {submitSurvey, clearStoredData, loadOrClearSurvey}
  ),
  withHandlers({
    deleteSurvey: ({clearStoredData, id}) => () => clearStoredData(id),
    submit: ({submitSurvey, history, id}) => () => submitSurvey(id, history.push),
  }),
  withProps(({data}) => ({
    saveCsv: () => downloadCsv(data.tables, `${data.title}.csv`),
  }))
)(Survey)
