import React, { Component } from 'react';
import './Header.css';
import AccountCircle from 'material-ui-icons/AccountCircle';

class Header extends Component {
  render() {
    return (
      <header className="dashboard-header">
        <div className="dashboard-header-content">
          <h1 className="dashboard-header-title">ProSplitter</h1>
          <div className="dashboard-header-profile">
            <a href="#" className="unstyled-a">
              <AccountCircle />
              <span className="dashboard-header-profile-name">{this.props.user.name}</span>
            </a>
          </div>
        </div>
      </header>
    );
  }
}

export default Header;
