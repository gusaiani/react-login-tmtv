import React from 'react'
import {Navbar, NavBrand, Nav, NavItem} from 'react-bootstrap'
import {Link} from 'react-router'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {logoutAndRedirect} from '../actions'

@connect((state) => {
  return {
   isAuthenticated: state.auth.isAuthenticated
  }
})
export default class CoreLayout extends React.Component {
  render () {

    const {dispatch} = this.props

    return (
      <div>
        <nav>
          <div className="logo">
            <Link className="navbar-brand" to="/">For TelemetryTV from @gusaiani</Link>
          </div>
          <div id="links">
            <Link to="/protected">Protected Content</Link>
            <Link to="/login">Login</Link>
            {this.props.isAuthenticated ?
              <a href='#' onClick={() => this.props.dispatch(logoutAndRedirect())}>Logout</a>
              : ''
            }
          </div>
        </nav>
        {this.props.children}
      </div>
    )
  }
}
