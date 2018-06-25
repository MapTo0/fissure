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
    this.usernameField = React.createRef();
    this.handleSignup = this.handleSignup.bind(this);
    this.handleSignin = this.handleSignin.bind(this);

  }

  postData(url, data) {
    // Default options are marked with *
    return fetch(url, {
      body: JSON.stringify(data), // must match 'Content-Type' header
      headers: {
        'user-agent': 'Mozilla/4.0 MDN Example',
        'content-type': 'application/json'
      },
      mode: 'cors',
      redirect: 'follow', // manual, *follow, error
      referrer: 'no-referrer', // *client, no-referrer
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
    })
      .then(response => response.json()) // parses response to JSON
  }

  handleSignup(event) {
    const email = this.emailField.current.state.value;
    const password = this.passwordField.current.state.value;
    const firstname = this.usernameField.current.state.value;
    const lastname = this.usernameField.current.state.value;

    this.postData('http://localhost:8080/api/v1/auth/register', { email, password, firstname, lastname })
      .then(data => {
        alert('Registration successful! You can now Sign in.');

        this.setState({
          ...this.state,
          showRegisterField: false
        });
      })
      .catch(error => {
        alert('Recheck given credentials!');
      });
  }

  handleSignin(event) {
    const email = this.emailField.current.state.value;
    const password = this.passwordField.current.state.value;
    const that = this;

    this.postData('http://localhost:8080/api/v1/auth/login', { email, password })
      .then(data => {
        window.localStorage["prosplitter-token"] = data.token;
        that.props.history.push("/dashboard");
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
            <LoginFormInput type="text" ref={this.usernameField} visible={this.state.showRegisterField} icon={<AccountBox style={{ alignSelf: 'center', marginTop: '20px' }} />} placeholder='Username' />

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