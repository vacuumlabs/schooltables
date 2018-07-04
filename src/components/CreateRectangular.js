import React, {Fragment} from 'react'
import {get} from 'lodash'
import {compose} from 'redux'
import {connect} from 'react-redux'
import {withHandlers} from 'recompose'
import {addColumnOnPath, addRowOnPathCreate, removeIndexOnPath} from '../actions'
import {tableContainer, surveyTable} from '../styles'
import {withStyles} from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button'
import AddIcon from '@material-ui/icons/Add'
import EditableCell from './EditableCell'
import Title from './Title'
import DeleteIcon from '@material-ui/icons/Delete'
import Tooltip from '@material-ui/core/Tooltip'

const styles = (theme) => ({
  tableContainer,
  surveyTable,
  leftIcon: {
    marginRight: theme.spacing.unit,
  },
})

const CreateRectangular = ({path, header, side, classes, addColumn, addRow, deleteTable}) => (
  <Fragment>
    <div className={classes.tableContainer}>
      <Title path={path} xLarge />
      <Table className={classes.surveyTable}>
        <TableHead>
          <TableRow>
            {header.map(
              (_, i) =>
                i === 0 ? (
                  <TableCell key={`edit_${i}`} />
                ) : (
                  <EditableCell
                    key={`edit_${i}`}
                    path={`${path}.header`}
                    index={i}
                    showDelete
                    editable
                    label={'Zadajte názov stĺpca'}
                  />
                )
            )}
            <Tooltip title="Pridať stĺpec">
              <IconButton onClick={addColumn}>
                <AddIcon />
              </IconButton>
            </Tooltip>
          </TableRow>
        </TableHead>
        <TableBody>
          {side.map((_, i) => (
            <TableRow key={`row_${i}`}>
              <EditableCell
                key={`cell_${i}`}
                path={`${path}.side`}
                index={i}
                showDelete
                editable
                label={'Zadajte názov riadku'}
              />
              {header.map((_, i) => <TableCell key={`other_cell_${i}`}>...</TableCell>)}
            </TableRow>
          ))}
        </TableBody>
        <Tooltip title="Pridať riadok">
          <IconButton onClick={addRow}>
            <AddIcon />
          </IconButton>
        </Tooltip>
      </Table>
    </div>
    <Button variant="contained" color="secondary" aria-label="Delete" onClick={deleteTable}>
      <DeleteIcon /> Zmazať tabulku
    </Button>
  </Fragment>
)

export default compose(
  withStyles(styles),
  connect(
    (state, props) => ({
      header: get(state, `${props.path}.header`),
      side: get(state, `${props.path}.side`),
    }),
    {addColumnOnPath, addRowOnPathCreate, removeIndexOnPath}
  ),
  withHandlers({
    addColumn: ({path, addColumnOnPath}) => () => addColumnOnPath(path),
    addRow: ({path, addRowOnPathCreate}) => () => addRowOnPathCreate(path),
    deleteTable: ({index, removeIndexOnPath}) => () => removeIndexOnPath(index, 'create.tables'),
  })
)(CreateRectangular)
