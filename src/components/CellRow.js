import React from 'react'
import {compose} from 'redux'
import {connect} from 'react-redux'
import {get} from 'lodash'
import EditableCell from './EditableCell'

const CellRow = ({row, path, editable, activeCell}) =>
  row.map((c, i) => (
    <EditableCell key={i} path={`${path}[i]`} active={activeCell === `${path}[i]`} />
  ))

export default compose(
  connect((state, props) => ({
    row: get(state, props.path),
    activeCell: state.activeCellPath,
  }))
)(CellRow)
