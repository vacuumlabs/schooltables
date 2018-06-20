import React from 'react'
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
  iconButton: {
    position: 'absolute',
    bottom: '-20px',
  },
})

const Preview = ({classes, root}) => (
  <div>
    <Paper className={classes.root}>Blah balh blah</Paper>
    <Survey />
  </div>
)

export default withStyles(styles)(Preview)
