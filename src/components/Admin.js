import React from 'react'
import {compose} from 'redux'
import {withRouter, Link} from 'react-router-dom'
import {withDataProviders} from 'data-provider'
import {adminCheckProvider} from '../dataProviders'
import {withStyles} from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

const styles = {
  container: {
    padding: 100,
  },
  item: {
    display: 'flex',
    justifyContent: 'center',
  },
  card: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    marginBottom: 16,
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
}

const Admin = ({classes}) => (
  <Grid container spacing={24} className={classes.container}>
    <Grid item xs={12} sm={6} className={classes.item}>
      <Link to="/create">
        <Card className={classes.card}>
          <CardContent>
            <Typography variant="headline" component="h2">
              Vytvorit novu
            </Typography>
            <Typography component="p">Lorem ipsum</Typography>
          </CardContent>
          <CardActions>
            <Button size="small">Vyvorit</Button>
          </CardActions>
        </Card>
      </Link>
    </Grid>
    <Grid item xs={12} sm={6} className={classes.item}>
      <Link to="/surveys">
        <Card className={classes.card}>
          <CardContent>
            <Typography variant="headline" component="h2">
              Zoznam
            </Typography>
            <Typography component="p">Lorem ipsum</Typography>
          </CardContent>
          <CardActions>
            <Button size="small">Zoznam</Button>
          </CardActions>
        </Card>
      </Link>
    </Grid>
  </Grid>
)

export default compose(
  withStyles(styles),
  withRouter,
  withDataProviders((props) => {
    return [adminCheckProvider(props.history.push)]
  })
)(Admin)
