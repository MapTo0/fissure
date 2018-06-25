import React, { Component } from 'react';
import './LoginFormContainer.css'
import logo from './cash.png'
import LoginForm from '../LoginForm/LoginForm'
import LogoIcon from 'material-ui-icons/AttachMoney';
import { withRouter } from 'react-router-dom';

const LoginFormContainer = withRouter(({ history }) => (
  <div className='login-form-container'>
    <div className='login-logo-container'>
      <LogoIcon style={{
        color: '#3f51b5',
        width: '32px',
        height: '32px'
      }} />
      <h1 className='login-logo-title'>ProSplitter</h1>
    </div>

    <LoginForm history={history}/>
  </div>
));

export default LoginFormContainer;