import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import MasterPage from './components/MasterPage'

function App () {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/*">{(props) => <MasterPage routeProps={props}/>}</Route>
      </Switch>
    </BrowserRouter>
  )
}

export default App
