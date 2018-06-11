import React from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'
import Landing from './Landing'
import Admin from './Admin'
import Resource from './Resource'

const App = () => (
  <Switch>
    <Route path="/" exact component={Landing} />
    <Route path="/admin" component={Admin} />
    <Route path="/resource/:id" component={Resource} />
    <Redirect to="/" />
  </Switch>
)

export default App
