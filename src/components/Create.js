import React from 'react'
import {compose} from 'redux'
import {connect} from 'react-redux'
import {withHandlers} from 'recompose'
import {withRouter, Link} from 'react-router-dom'
import {withDataProviders} from 'data-provider'
import {adminCheckProvider} from '../dataProviders'
import {withStyles} from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
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
import Note from './Note'
import CreateHeader from './CreateHeader'
import CreateStandard from './CreateStandard'
import CreateRectangular from './CreateRectangular'

const styles = (theme) => ({
  root: {
    width: '100%',
    padding: 50,
  },
  paper: {
    padding: 20,
    paddingTop: theme.spacing.unit * 2,
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
    this.state = {mounted: false}
  }

  componentDidMount = () => {
    this.props.loadOrClearSurvey('create')
    this.setState({mounted: true})
  }

  componentDidUpdate = () => {
    if (this.state.mounted) {
      window.localStorage.setItem('create', JSON.stringify(this.props.data))
    }
    return null
  }

  render = () => {
    const path = 'create'
    const {data, classes, deleteForm, submitForm, addRectangular, addStandard} = this.props
    const {tables} = data
    return (
      <div className={classes.root}>
        <Paper className={classes.paper}>
          <Title path={path} xxLarge />
          <Note path={path} />
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
          <div>
            <Typography variant="subheading" gutterBottom>
              Pridat
            </Typography>
            <Button variant="outlined" className={classes.button} onClick={addRectangular}>
              <ViewQuilt className={classes.leftIcon} />
              2D tabulka
            </Button>
            <Button variant="outlined" className={classes.button} onClick={addStandard}>
              <ViewStream className={classes.leftIcon} />
              Standard tabulka
            </Button>
          </div>
          <div>
            <Typography variant="subheading" gutterBottom>
              Dokoncit
            </Typography>
            <Link to="/preview">
              <Button variant="outlined" className={classes.button}>
                <Check className={classes.leftIcon} />
                Nahlad
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
          </div>
        </Paper>
      </div>
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
