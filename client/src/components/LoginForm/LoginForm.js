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

  constructor(props) {
    super(props);

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

  handleSignup(event) {
    const email = this.emailField.current.state.value;
    const password = this.passwordField.current.state.value;
    const username = this.usernameField.current.state.value;

  }

  handleSignin(event) {
    const email = this.emailField.current.state.value;
    const password = this.passwordField.current.state.value;

    // call 
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
        <span className='login-form-title'>Login to Beyond The Cash</span>
        <div className='login-form-content'>
          <form className='login-form-content-form'>
            <LoginFormInput 
              visible="true"
              ref={this.emailField}
              icon={
                <EmailIcon
                  style={{ alignSelf: 'center', marginTop: '20px' }} 
                />}
              placeholder='Email'
              onChange={this.handleEmailValidation}
              />

            <LoginFormInput ref={this.passwordField} visible="true" icon={<PasswordIcon style={{ alignSelf: 'center', marginTop: '20px' }} />} placeholder='Password' />
            <LoginFormInput ref={this.usernameField} visible={this.state.showRegisterField} icon={<AccountBox style={{ alignSelf: 'center', marginTop: '20px' }} />} placeholder='Username' />

            <a src='#' className={'login-form-link ' + (this.state.showRegisterField ? 'hidden' : '')}>Forgot password?</a>

            <StyledButton variant="raised" onClick={this.state.showRegisterField ? this.handleSignup : this.handleSignin}color="primary" size='small' className='login-form-btn'>{this.state.showRegisterField ? 'Sign up' : "Sign in"}</StyledButton>
            
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