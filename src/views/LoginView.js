import React from 'react/addons'
import {findDOMNode} from 'react-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import reactMixin from 'react-mixin'

import Joi from 'joi'
import validation from 'react-validation-mixin'
import strategy from 'joi-validation-strategy'
import classnames from 'classnames'

import * as actionCreators from '../actions'

export class LoginView extends React.Component {

  constructor(props) {
    super(props)
    const redirectRoute = this.props.location.query.next || '/login'
    this.state = {
      email: '',
      password: '',
      redirectTo: redirectRoute
    }

    this.validatorTypes = {
      email: Joi.string().email().required().label('Email'),
      password: Joi.string().min(8).label('Password')
    }

    this.getValidatorData = this.getValidatorData.bind(this)
    this.renderHelpText = this.renderHelpText.bind(this)
    this.getClasses = this.getClasses.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  login() {
    const {email, password, redirectTo} = this.state
    this.props.actions.loginUser(email, password, redirectTo)
  }

  onSubmit(event) {
    event.preventDefault()
    const onValidate = (error) => {
      if (error) {
        //form has errors; do not submit
      } else {
        this.login()
      }
    }
    this.props.validate(onValidate)
  }

  getClasses(field) {
    return classnames({
      'form-group': true,
      'has-error': !this.props.isValid(field)
    })
  }

  getValidatorData() {
    return {
      email: findDOMNode(this.refs.email).value,
      password: findDOMNode(this.refs.password).value
    }
  }

  renderHelpText(message) {
    return (<span className='help-block'>{message}</span>)
  }

  render () {
    return (
      <div>
        <h3>Please Login</h3>
        {this.props.statusText ? <div className='alert alert-info'>{this.props.statusText}</div> : ''}
        <form role='form' onSubmit={this.onSubmit}>
          <input type='text'
            ref='email'
            valueLink={this.linkState('email')}
            placeholder='Email'
            onBlur={this.props.handleValidation('email')} />
          {this.renderHelpText(this.props.getValidationMessages('email'))}
          <input type='password'
            ref='password'
            valueLink={this.linkState('password')}
            placeholder='Password'
            onBlur={this.props.handleValidation('password')} />
          {this.renderHelpText(this.props.getValidationMessages('password'))}
          <button type='submit'
            disabled={this.props.isAuthenticating}>Submit ›</button>
        </form>
      </div>
    )
  }
}

reactMixin(LoginView.prototype, React.addons.LinkedStateMixin)

const mapStateToProps = (state) => ({
  isAuthenticating: state.auth.isAuthenticating,
  statusText: state.auth.statusText
})

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actionCreators, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(validation(strategy)(LoginView))
