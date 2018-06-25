import React, { Component } from 'react';
import './LoginForm.css'
import LoginFormInput from '../LoginFormInput/LoginFormInput'
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import EmailIcon from 'material-ui-icons/MailOutline';
import PasswordIcon from 'material-ui-icons/Security';
import AccountBox from 'material-ui-icons/AccountBox';

const styles = theme => ({
  root: {
    marginTop: '20px',
    borderRadius: '5px'
  },
});

const StyledButton = withStyles(styles)(Button);

class LoginForm extends Component {

  constructor(props, context) {
    super(props, context);

    this.state = {
      showRegisterField: false
    }

    this.handleShowSignup = this.handleShowSignup.bind(this);
    this.emailField = React.createRef();
    this.passwordField = React.createRef();
    this.firstnameField = React.createRef();
    this.lastnameField = React.createRef();
    this.handleSignup = this.handleSignup.bind(this);
    this.handleSignin = this.handleSignin.bind(this);
  }

  fetchData(method, url, data) {
    // Default options are marked with *
    return fetch(url, {
      body: JSON.stringify(data), // must match 'Content-Type' header
      headers: {
        'user-agent': 'Mozilla/4.0 MDN Example',
        'content-type': 'application/json'
      },
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, cors, *same-origin
    })
      .then(response => response.json()) // parses response to JSON
  }

  handleSignup(event) {
    const email = this.emailField.current.state.value;
    const password = this.passwordField.current.state.value;
    const firstname = this.firstnameField.current.state.value;
    const lastname = this.lastnameField.current.state.value;

    this.fetchData('POST', 'http://localhost:8080/api/v1/auth/register', { email, password, firstname, lastname })
      .then(data => {
        if (data.messages.length > 0) {
          alert('Recheck given credentials!');          
        } else {
          alert('Registration successful! You can now Sign in.');
  
          this.setState({
            ...this.state,
            showRegisterField: false
          });
        }
      })
      .catch(error => {
        alert('Recheck given credentials!');
      });
  }

  handleSignin(event) {
    const email = this.emailField.current.state.value;
    const password = this.passwordField.current.state.value;
    const that = this;

    this.fetchData('POST', 'http://localhost:8080/api/v1/auth/login', { email, password })
      .then(data => {

        if (data.token) {
          window.localStorage["prosplitter-token"] = data.token;
          that.props.history.push("/dashboard");
        } else {
          alert('Recheck given credentials!');
        }
      })
      .catch(error => {
        alert('Recheck given credentials!');
      });
  }

  handleShowSignup(event) {
    this.setState({
      showRegisterField: !this.state.showRegisterField,
      validEmailField: true
    });
  }

  handleEmailValidation(event) {
    // Email validation
  }

  render() {
    return (
      <div className='login-form'>
        <span className='login-form-title'>Login to ProSplitter</span>
        <div className='login-form-content'>
          <form className='login-form-content-form'>
            <LoginFormInput
              type="text"
              visible="true"
              ref={this.emailField}
              icon={
                <EmailIcon
                  style={{ alignSelf: 'center', marginTop: '20px' }}
                />}
              placeholder='Email'
              onChange={this.handleEmailValidation}
            />

            <LoginFormInput type="password" ref={this.passwordField} visible="true" icon={<PasswordIcon style={{ alignSelf: 'center', marginTop: '20px' }} />} placeholder='Password' />
            <LoginFormInput type="text" ref={this.firstnameField} visible={this.state.showRegisterField} icon={<AccountBox style={{ alignSelf: 'center', marginTop: '20px' }} />} placeholder='First Name' />
            <LoginFormInput type="text" ref={this.lastnameField} visible={this.state.showRegisterField} icon={<AccountBox style={{ alignSelf: 'center', marginTop: '20px' }} />} placeholder='Last Name' />

            <a src='#' className={'login-form-link ' + (this.state.showRegisterField ? 'hidden' : '')}>Forgot password?</a>

            <StyledButton variant="raised" onClick={this.state.showRegisterField ? this.handleSignup : this.handleSignin} color="primary" size='small' className='login-form-btn'>{this.state.showRegisterField ? 'Sign up' : "Sign in"}</StyledButton>

            <div className='login-form-footer'>
              <span>{this.state.showRegisterField ? 'Already registered?' : "Don't have account yet?"}</span>
              <a src='#' onClick={this.handleShowSignup} className='login-form-link'>{this.state.showRegisterField ? 'Sign in' : "Sign up"}</a>
            </div>

          </form>
        </div>
      </div>
    );
  }
}

export default LoginForm;