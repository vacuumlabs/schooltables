import React from 'react'
import {compose} from 'redux'
import {withRouter} from 'react-router-dom'
import {withDataProviders} from 'data-provider'
import {adminCheckProvider} from '../dataProviders'
import {withStyles} from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Survey from './Survey'

const styles = (theme) => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
})

const Preview = ({classes, root}) => (
  <div>
    <Paper className={classes.root}>Blah balh blah</Paper>
    <Survey />
  </div>
)

export default compose(
  withStyles(styles),
  withRouter,
  withDataProviders((props) => {
    return [adminCheckProvider(props.history.push)]
  })
)(Preview)
