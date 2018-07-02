import React from 'react'
import {withStyles} from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import {compose} from 'redux'
import {connect} from 'react-redux'
import {get} from 'lodash'
import {withHandlers, withProps} from 'recompose'
import {updateValue} from '../actions'

const styles = (theme) => ({
  field: {
    display: 'block',
    margin: '1rem 0',
  },
})

const Note = ({value, onChange, classes}) => (
  <TextField
    label={'Poznámky'}
    value={value == null ? '' : value}
    margin="normal"
    multiline
    rows="2"
    fullWidth
    className={classes.field}
    onChange={onChange}
  />
)

export default compose(
  withStyles(styles),
  connect(
    (state, props) => ({
      stateValue: get(state, `${props.path}.note`),
    }),
    {updateValue}
  ),
  withProps(({stateValue}) => ({value: stateValue == null ? '' : stateValue})),
  withHandlers({
    onChange: ({path, updateValue}) => (e) => updateValue(`${path}.note`, e.target.value),
  })
)(Note)
