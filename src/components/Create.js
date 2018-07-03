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
import Tooltip from '@material-ui/core/Tooltip'
import Send from '@material-ui/icons/Send'
import Cancel from '@material-ui/icons/Cancel'
import Search from '@material-ui/icons/Search'
import ViewQuilt from '@material-ui/icons/ViewQuilt'
import ViewStream from '@material-ui/icons/ViewStream'
import Delete from '@material-ui/icons/Delete'
import ArrowBack from '@material-ui/icons/ArrowBack'
import {
  clearStoredData,
  loadOrClearSurvey,
  addRectangular,
  addStandard,
  submitCreate,
} from '../actions'
import {root} from '../styles'
import Title from './Title'
import Note from './Note'
import CreateHeader from './CreateHeader'
import CreateStandard from './CreateStandard'
import CreateRectangular from './CreateRectangular'

const styles = (theme) => ({
  root,
  paper: {
    padding: '2rem',
    paddingTop: theme.spacing.unit * 2,
    marginTop: 20,
  },
  iconButton: {
    position: 'absolute',
    right: '-20px',
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
  leftIcon: {
    marginRight: theme.spacing.unit,
  },
  subheading: {
    marginTop: '1rem',
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
        <Link to="/surveys">
          <Button className={classes.returnButton}>
            <ArrowBack className={classes.leftIcon} />
            Späť na zoznam
          </Button>
        </Link>
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
            <Typography variant="subheading" gutterBottom className={classes.subheading}>
              Pridať
            </Typography>
            <Tooltip title="Tabulka so zadaným počtom a názvami stĺpcov">
              <Button variant="contained" className={classes.button} onClick={addStandard}>
                <ViewStream className={classes.leftIcon} />
                Tabulka
              </Button>
            </Tooltip>
            <Tooltip title="Tabulka so zadanými stĺpaci a riadkami">
              <Button variant="contained" className={classes.button} onClick={addRectangular}>
                <ViewQuilt className={classes.leftIcon} />
                2D tabulka
              </Button>
            </Tooltip>
          </div>
          <div>
            <Typography variant="subheading" gutterBottom className={classes.subheading}>
              Dokončiť
            </Typography>
            <Tooltip title="Náhlad na výsledný interaktívny dotazník">
              <Link to="/preview">
                <Button variant="contained" className={classes.button}>
                  <Search className={classes.leftIcon} />
                  Náhľad
                </Button>
              </Link>
            </Tooltip>
            <Button
              variant="contained"
              color="secondary"
              className={classes.button}
              onClick={deleteForm}
            >
              <Cancel className={classes.leftIcon} />
              Zmazať formulár
            </Button>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={submitForm}
            >
              <Send className={classes.leftIcon} />
              Dokončiť formulár
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
