import React from 'react'
import {compose} from 'redux'
import {connect} from 'react-redux'
import {withHandlers} from 'recompose'
import {withRouter, Link} from 'react-router-dom'
import {withDataProviders} from 'data-provider'
import {adminCheckProvider} from '../dataProviders'
import {withStyles} from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import ViewQuilt from '@material-ui/icons/ViewQuilt'
import ViewStream from '@material-ui/icons/ViewStream'
import Delete from '@material-ui/icons/Delete'
import Check from '@material-ui/icons/Check'
import {
  clearStoredData,
  loadOrClearSurvey,
  addRectangular,
  addStandard,
  submitCreate,
} from '../actions'
import Title from './Title'
import CreateHeader from './CreateHeader'
import CreateStandard from './CreateStandard'
import CreateRectangular from './CreateRectangular'

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
  button: {
    margin: theme.spacing.unit,
  },
  leftIcon: {
    marginRight: theme.spacing.unit,
  },
})

class CreateSurvey extends React.Component {
  constructor(props) {
    super(props)
    this.state = {activeId: undefined}
  }

  componentDidMount = () => {
    //this.props.loadOrClearSurvey('create')
  }

  static getDerivedStateFromProps = (props) => {
    if (props.data) {
      window.localStorage.setItem('create', JSON.stringify(props.data))
    }
    return null
  }

  render = () => {
    const path = 'create'
    const {data, classes, deleteForm, submitForm, addRectangular, addStandard} = this.props
    const {tables} = data
    return (
      <Paper className={classes.root}>
        <Title path={path} />
        {tables.map((t, i) => {
          const tablePath = `${path}.tables[${i}]`
          switch (t.type) {
            case 'header':
              return <CreateHeader key={`table_${i}`} path={tablePath} index={i} />
            case 'standard':
              return <CreateStandard key={`table_${i}`} path={tablePath} index={i} />
            case 'rectangular':
              return <CreateRectangular key={`table_${i}`} path={tablePath} index={i} />
            default:
              return null
          }
        })}
        <Button variant="outlined" className={classes.button} onClick={addRectangular}>
          <ViewQuilt className={classes.leftIcon} />
          2D tabulka
        </Button>
        <Button variant="outlined" className={classes.button} onClick={addStandard}>
          <ViewStream className={classes.leftIcon} />
          Standard tabulka
        </Button>
        <Link to="/preview">
          <Button variant="outlined" className={classes.button}>
            <Check className={classes.leftIcon} />
            Preview
          </Button>
        </Link>
        <Button variant="outlined" className={classes.button} onClick={deleteForm}>
          <Delete className={classes.leftIcon} />
          Zmazat formular
        </Button>
        <Button variant="outlined" className={classes.button} onClick={submitForm}>
          <Check className={classes.leftIcon} />
          Dokoncit formular
        </Button>
      </Paper>
    )
  }
}

export default compose(
  withRouter,
  withStyles(styles),
  withDataProviders((props) => {
    return [adminCheckProvider(props.history.push)]
  }),
  connect(
    (state, props) => ({
      data: state.create,
    }),
    {addRectangular, addStandard, clearStoredData, loadOrClearSurvey, submitCreate}
  ),
  withHandlers({
    deleteForm: ({clearStoredData}) => () => clearStoredData('create'),
    submitForm: ({submitCreate, history}) => () => submitCreate(history.push),
  })
)(CreateSurvey)
