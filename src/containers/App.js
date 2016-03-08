import React from 'react'
import {Link} from 'react-router'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {logoutAndRedirect} from '../actions'

import '../styles/main.styl'

@connect((state) => {
  return {
   isAuthenticated: state.auth.isAuthenticated
  }
})

export default class CoreLayout extends React.Component {
  render () {
    const {dispatch, isAuthenticated} = this.props

    return (
      <div>
        <header>
          <Link to="/">For TelemetryTV from @gusaiani</Link>
          <nav>
            <Link to="/protected">Protected Content</Link>
            {isAuthenticated
              ? <a href='#' onClick={() => dispatch(logoutAndRedirect())}>Logout</a>
              : <Link to="/login">Login</Link>
            }
          </nav>
        </header>
        <div className="main">
          {this.props.children}
        </div>
      </div>
    )
  }
}
