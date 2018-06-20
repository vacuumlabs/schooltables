// import React from 'react'
// import {compose} from 'redux'
// import {connect} from 'react-redux'
// import {withStyles} from '@material-ui/core/styles'
// import Table from '@material-ui/core/Table'
// import TableBody from '@material-ui/core/TableBody'
// import TableCell from '@material-ui/core/TableCell'
// import TableHead from '@material-ui/core/TableHead'
// import TableRow from '@material-ui/core/TableRow'
// import TextField from '@material-ui/core/TextField'
// import Paper from '@material-ui/core/Paper'
// import Rnd from 'react-rnd'

// const styles = (theme) => ({
//   root: {
//     width: '100%',
//     marginTop: theme.spacing.unit * 3,
//     overflowX: 'auto',
//   },
//   row: {
//     display: 'flex',
//     margin: '300px',
//   },
//   rnd: {
//     position: 'relative',
//   },
//   cellContent: {
//     padding: '5px',
//     borderLeft: '1px solid black',
//     borderRight: '1px solid black',
//   },
//   fakeCell: {
//     position: 'absolute',
//     width: '100%',
//     height: '20px',
//     borderLeft: '1px solid black',
//     borderRight: '1px solid black',
//     boxSizing: 'border-box',
//   },
// })

// // TODO maybe later

// class CreateSurvey extends React.Component {
//   constructor(props) {
//     super(props)
//     this.state = {width: 200}
//   }

//   render = () => (
//     <Paper className={this.props.classes.root}>
//       <div className={this.props.classes.row}>
//         {data.map((d) => {
//           <Rnd
//           // size={{width: this.state.width}}
//           style={{position: 'relative'}}
//           disableDragging
//           enableResizing={{right: true}}
//           onResize={(e, dir, ref, delta) =>
//             this.setState({width: this.state.width + delta.width})
//           }
//         >
//           <div className={this.props.classes.cellContent} onClick={() => console.log('hey')}>huhu</div>
//           <div className={this.props.classes.fakeCell} />
//         </Rnd>
//         })}
//       </div>
//     </Paper>
//   )
// }

// export default compose(
//   withStyles(styles),
//   connect((state, props) => ({
//     data: createTableSelector(state, props),
//   }), {})
// )(Resource)

// export default withStyles(styles)(CreateSurvey)

// /* <TextField
//                   id="name"
//                   className={this.props.classes.textField}
//                   value="huhu"
//                   margin="normal"
//                 /> */
