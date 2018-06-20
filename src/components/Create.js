import React from 'react'
import {compose} from 'redux'
import {connect} from 'react-redux'
import {withHandlers} from 'recompose'
import {withRouter} from 'react-router-dom'
import {get} from 'lodash'
import {withStyles} from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import ViewQuilt from '@material-ui/icons/ViewQuilt'
import ViewStream from '@material-ui/icons/ViewStream'
import Delete from '@material-ui/icons/Delete'
import Check from '@material-ui/icons/Check'
import {clearStoredData, loadOrClear, addRectangular, addStandard, submitCreate} from '../actions'
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
    this.props.loadOrClear('create')
  }

  getDerivedStateFromProps = (props) => {
    window.localStorage.setItem('create', props.data)
  }

  render = () => {
    const path = 'create'
    const {tables, classes, deleteCreate, submitCreate, addRectangular, addStandard} = this.props
    return (
      <Paper className={classes.root}>
        <Title path={path} />
        {tables.map((t, i) => {
          const tablePath = `${path}.tables[${i}]`
          switch (t.type) {
            case 'header':
              return <CreateHeader path={tablePath} />
            case 'standard':
              return <CreateStandard path={tablePath} />
            case 'Rectangular':
              return <CreateRectangular path={tablePath} />
            default:
              return null
          }
        })}
        <Button variant="outlined" className={classes.button} onClick={addRectangular}>
          <ViewQuilt className={classes.leftIcon} />
          Rectangular tabulka
        </Button>
        <Button variant="outlined" className={classes.button} onClick={addStandard}>
          <ViewStream className={classes.leftIcon} />
          Standard tabulka
        </Button>
        <Button variant="outlined" className={classes.button} onClick={deleteCreate}>
          <Delete className={classes.leftIcon} />
          Zmazat formular
        </Button>
        <Button variant="outlined" className={classes.button} onClick={submitCreate}>
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
  connect(
    (state, props) => ({
      tables: get(state, `${props.path}.tables`),
    }),
    {addRectangular, addStandard, clearStoredData, loadOrClear, submitCreate}
  ),
  withHandlers({
    delete: ({path, clearStoredData}) => () => clearStoredData(path),
    submit: ({submitCreate, history}) => () => submitCreate(history.push),
  })
)(CreateSurvey)