import React from 'react'
import {compose} from 'redux'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {withHandlers, withState} from 'recompose'
import {login} from '../actions'
import {withStyles} from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'

const styles = {
  container: {
    margin: 100,
    display: 'flex',
    justifyContent: 'center',
  },
  paper: {
    padding: 20,
    maxWidth: 400,
    display: 'flex',
    flexDirection: 'column',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  item: {
    display: 'block',
  },
}

const Login = ({classes, name, password, onChangeName, onChangePassword, loginClick, error}) => {
  return (
    <div className={classes.container}>
      <Paper className={classes.paper}>
        <form
          action={`${process.env.REACT_APP_API_URL}/admin/login`}
          method="POST"
          className={classes.form}
        >
          {error}
          <TextField
            value={name}
            name="username"
            label="Name"
            margin="normal"
            onChange={onChangeName}
          />
          <TextField
            name="username"
            value={password}
            label="Password"
            margin="normal"
            type="password"
            onChange={onChangePassword}
          />
          <Button onClick={loginClick}>Login</Button>
        </form>
      </Paper>
    </div>
  )
}
export default compose(
  withStyles(styles),
  withRouter,
  withState('name', 'setName', ''),
  withState('password', 'setPassword', ''),
  connect(
    (state) => ({error: state.loginError}),
    {login}
  ),
  withHandlers({
    loginClick: ({login, name, password, history}) => () => login(history.push, name, password),
    onChangeName: ({setName}) => (e) => setName(e.target.value),
    onChangePassword: ({setPassword}) => (e) => setPassword(e.target.value),
  })
)(Login)
