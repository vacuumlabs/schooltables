import React from 'react'
import {compose} from 'redux'
import {withHandlers, withState} from 'recompose'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'

const Login = ({classes, name, password, onChangeName, onChangePassword}) => {
  return (
    <Paper>
      <form action="/login">
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
        <Button>Login</Button>
      </form>
    </Paper>
  )
}
export default compose(
  withState('name', 'setName', ''),
  withState('password', 'setPassword', ''),
  withHandlers({
    onChangeName: ({setName}) => (e) => setName(e.target.value),
    onChangePassword: ({setPassword}) => (e) => setPassword(e.target.value),
  })
)(Login)
