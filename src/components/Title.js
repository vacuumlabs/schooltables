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
    marginBottom: '0.5rem',
  },
})

const Title = ({value, onChange, xLarge, xxLarge, classes}) => (
  <TextField
    label={xxLarge ? 'Zadajte názov dotazníku' : 'Zadajte názov tabulky'}
    value={value == null ? '' : value}
    margin="normal"
    onChange={onChange}
    className={classes.field}
    inputProps={{style: xLarge ? {fontSize: 'x-large'} : xxLarge ? {fontSize: 'x-large'} : {}}}
  />
)

export default compose(
  withStyles(styles),
  connect(
    (state, props) => ({
      stateValue: get(state, `${props.path}.title`),
    }),
    {updateValue}
  ),
  withProps(({stateValue}) => ({value: stateValue == null ? '' : stateValue})),
  withHandlers({
    onChange: ({path, updateValue}) => (e) => updateValue(`${path}.title`, e.target.value),
  })
)(Title)
