import React, {Fragment} from 'react'
import {compose} from 'redux'
import {connect} from 'react-redux'
import {Link, withRouter} from 'react-router-dom'
import {withDataProviders} from 'data-provider'
import {surveyListProvider} from '../dataProviders'
import {updateArchived} from '../actions'
import {withStyles} from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Add from '@material-ui/icons/Add'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import InsertDriveFile from '@material-ui/icons/InsertDriveFile'
import ToggleLocked from './ToggleLocked'

const styles = (theme) => ({
  container: {
    margin: 100,
    display: 'flex',
    flexDirection: 'column',
  },
  paper: {
    padding: 20,
    display: 'flex',
    flexDirection: 'column',
  },
  leftIcon: {
    marginRight: theme.spacing.unit,
  },
  root: {
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  button: {
    margin: 20,
    alignSelf: 'center',
    float: 'right',
  },
})

const SurveyList = ({data, classes, archive, updateArchived}) => {
  return (
    <Fragment>
      <Link to={archive ? 'surveys' : '/archive'}>
        <Button className={classes.returnButton}>{archive ? 'Späť' : 'Archív'}</Button>
      </Link>
      <div className={classes.container}>
        <Paper className={classes.paper}>
          <Typography variant="headline" gutterBottom>
            Zoznam existujúcich dotazníkov
          </Typography>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>Dátum</TableCell>
                <TableCell>Názov</TableCell>
                <TableCell>Uzamknutý</TableCell>
                <TableCell />
              </TableRow>
            </TableHead>
            <TableBody>
              {Object.values(data)
                .filter((row) => !!row.archived === !!archive)
                .map((row, i) => (
                  <TableRow key={i}>
                    <TableCell>{new Date(row.created_at).toLocaleString()}</TableCell>
                    <TableCell>
                      <Link to={`/results/${row.id}`}>{row.data.title}</Link>
                    </TableCell>
                    <TableCell>
                      <ToggleLocked surveyId={row.id} locked={row.locked} />
                    </TableCell>
                    <TableCell>
                      <Button size="small" onClick={() => updateArchived(row.id, !row.archived)}>
                        {row.archived ? 'Vybrať z Archívu' : 'Archivovať'}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </Paper>
        <Link to="/create">
          <Button variant="contained" color="primary" className={classes.button}>
            <InsertDriveFile className={classes.leftIcon} />
            Vytvoriť nový dotazník
          </Button>
        </Link>
      </div>
    </Fragment>
  )
}

export default compose(
  withRouter,
  withStyles(styles),
  withDataProviders((props) => {
    return [surveyListProvider(props.history.push)]
  }),
  connect(
    (state, props) => ({
      data: state.surveyList,
    }),
    {updateArchived}
  )
)(SurveyList)
