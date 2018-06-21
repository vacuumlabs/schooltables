import React from 'react'
import {compose} from 'redux'
import {connect} from 'react-redux'
import {get} from 'lodash'
import EditableCell from './EditableCell'

const CellRow = ({row, path}) => row.map((c, i) => <EditableCell key={i} path={`${path}[${i}]`} />)

export default compose(
  connect((state, props) => ({
    row: get(state, props.path),
  }))
)(CellRow)
