import React, {Fragment} from 'react'
import {compose} from 'redux'
import {connect} from 'react-redux'
import {branch, withHandlers, withProps} from 'recompose'
import {withRouter} from 'react-router-dom'
import {withDataProviders} from 'data-provider'
import {get} from 'lodash'
import {submitSurvey, clearStoredData, loadOrClearSurvey} from '../actions'
import {paramsOrCreateSelector} from '../selectors'
import {surveyProvider} from '../dataProviders'
import {withStyles} from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
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

class Survey extends React.Component {
  constructor(props) {
    super(props)
    this.state = {loaded: false}
  }

  componentDidMount = () => {
    this.props.loadOrClearSurvey(paramsOrCreateSelector(undefined, this.props))
    this.setState({loaded: true})
  }

  static getDerivedStateFromProps = (props) => {
    const id = paramsOrCreateSelector(undefined, props)
    if (id !== 'create' && props.data) {
      window.localStorage.setItem(id, JSON.stringify(props.data))
    }
    return null
  }

  render = () => {
    // skip first render
    if (!this.state.loaded) return null
    // TODO thank you screen
    const {path, data, classes, submit, deleteSurvey} = this.props
    const {tables} = data
    return (
      <Paper className={this.props.classes.root}>
        <Title path={path} />
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
        {paramsOrCreateSelector(undefined, this.props) !== 'create' && (
          <Fragment>
            <Button variant="outlined" className={classes.button} onClick={deleteSurvey}>
              <Delete className={classes.leftIcon} />
              Zmazat formular
            </Button>
            <Button variant="outlined" className={classes.button} onClick={submit}>
              <Check className={classes.leftIcon} />
              Dokoncit formular
            </Button>
          </Fragment>
        )}
      </Paper>
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
    }),
    {submitSurvey, clearStoredData, loadOrClearSurvey}
  ),
  withHandlers({
    deleteSurvey: ({clearStoredData, id}) => () => clearStoredData(id),
    submit: ({submitSurvey, history, id}) => () => submitSurvey(id, history.push),
  })
)(Survey)
