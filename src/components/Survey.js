import React, {Fragment} from 'react'
import {compose} from 'redux'
import {connect} from 'react-redux'
import {branch, withHandlers} from 'recompose'
import {withRouter} from 'react-router-dom'
import {withDataProviders} from 'data-provider'
import {get} from 'lodash'
import {submitSurvey, clearStoredData} from '../actions'
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
    this.state = {activeId: undefined}
  }

  componentDidMount = () => {
    this.props.loadOrClear('create')
  }

  getDerivedStateFromProps = (props) => {
    window.localStorage.setItem('create', props.data)
  }

  render = () => {
    const {path, data, classes, submitSurvey, deleteSurvey} = this.props
    const {tables} = data
    return (
      <Paper className={this.props.classes.root}>
        <Title path={path} />
        {tables.map((t, i) => {
          const tablePath = `${path}.tables[${i}]`
          switch (t.type) {
            case 'header':
              return <Header path={tablePath} />
            case 'standard':
              return <Standard path={tablePath} />
            case 'Rectangular':
              return <Rectangular path={tablePath} />
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
            <Button variant="outlined" className={classes.button} onClick={submitSurvey}>
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
  branch(
    (props) => paramsOrCreateSelector(undefined, props) !== 'create',
    withDataProviders((props) => {
      return [surveyProvider(paramsOrCreateSelector(undefined, props))]
    })
  ),
  connect(
    (state, props) => ({
      data: get(state, props.path),
      activeCell: state.activeCellPath,
    }),
    {submitSurvey, clearStoredData}
  ),
  withHandlers({
    deleteSurvey: ({clearStoredData}) => () => clearStoredData('create'),
  })
)(Survey)
