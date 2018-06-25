import React, { Component } from 'react';
import './InviteFriends.css';

class InviteFriends extends Component {
  render() {
    return (
      <section className="invite-friends">
        <header className="invite-header">
          <span className="invite-header-text">Invite Friends</span>
        </header>
        <div className="invite-content">
          <input type="email" />
          <button className="invite-btn" >Send invite</button>
        </div>
      </section>
    );
  }
}

export default InviteFriends;
