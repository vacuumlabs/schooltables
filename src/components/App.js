import React from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'
import Login from './Login'
import Admin from './Admin'
import Results from './Results'
import Survey from './Survey'
import SurveyList from './SurveyList'
import Preview from './Preview'
import Create from './Create'

const App = () => (
  <Switch>
    <Route path="/" exact component={Admin} />
    <Route path="/login" exact component={Login} />
    <Route path="/create" component={Create} />
    <Route path="/preview" component={Preview} />
    <Route path="/surveys" component={SurveyList} />
    <Route path="/survey/:id" component={Survey} />
    <Route path="/results/:id" component={Results} />
    <Redirect to="/" />
  </Switch>
)

export default App
