import React from 'react'
import {Route, IndexRoute} from 'react-router'
import {App} from '../containers/App'
import {LoginView} from '../views/LoginView'
import {ProtectedView} from '../views/ProtectedView'
import {requireAuthentication} from '../components/AuthenticatedComponent'

export default(
  <Route path='/' component={App}>
    <IndexRoute component={LoginView}/>
    <Route path="login" component={LoginView}/>
    <Route path="protected" component={requireAuthentication(ProtectedView)}/>
  </Route>
)
