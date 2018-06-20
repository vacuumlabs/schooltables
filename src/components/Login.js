import React from 'react'
import {compose} from 'redux'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {withHandlers, withState} from 'recompose'
import {login} from '../actions'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'

const Login = ({classes, name, password, onChangeName, onChangePassword, loginClick}) => {
  return (
    <Paper>
      <form action={`${process.env.REACT_APP_API_URL}/admin/login`} method="POST">
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
          onChange={onChangePassword}
        />
        <Button onClick={loginClick}>Login</Button>
      </form>
    </Paper>
  )
}
export default compose(
  withRouter,
  withState('name', 'setName', ''),
  withState('password', 'setPassword', ''),
  connect(
    undefined,
    {login}
  ),
  withHandlers({
    loginClick: ({login, name, password, history}) => () => login(history.push, name, password),
    onChangeName: ({setName}) => (e) => setName(e.target.value),
    onChangePassword: ({setPassword}) => (e) => setPassword(e.target.value),
  })
)(Login)
