import React from 'react'
import {compose} from 'redux'
import {withRouter} from 'react-router-dom'
import {withDataProviders} from 'data-provider'
import {adminCheckProvider} from '../dataProviders'
import {withStyles} from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Survey from './Survey'

const Preview = () => <Survey />

export default compose(
  withRouter,
  withDataProviders((props) => {
    return [adminCheckProvider(props.history.push)]
  })
)(Preview)
