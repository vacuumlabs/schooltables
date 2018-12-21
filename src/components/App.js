import React from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'
import Login from './Login'
import Results from './Results'
import Survey from './Survey'
import SurveyList from './SurveyList'
import Create from './Create'
import Preview from './Preview'

const App = () => (
  <Switch>
    <Route path="/" exact component={SurveyList} />
    <Route path="/login" exact component={Login} />
    <Route path="/create" component={Create} />
    <Route path="/preview" component={Preview} />
    <Route path="/surveys" component={SurveyList} />
    <Route path="/archive" render={(props) => <SurveyList {...props} archive />} />
    <Route path="/survey/:id" component={Survey} />
    <Route path="/results/:id" component={Results} />
    <Redirect to="/" />
  </Switch>
)

export default App
