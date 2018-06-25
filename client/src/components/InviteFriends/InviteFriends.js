import React, { Component } from 'react';
import './InviteFriends.css';

class InviteFriends extends Component {
  constructor(props) {
    super(props);

    this.friendEmail = React.createRef();
  }

  render() {
    return (
      <section className="invite-friends">
        <header className="invite-header">
          <span className="invite-header-text">Invite Friends</span>
        </header>
        <div className="invite-content">
          <input type="email" ref={this.friendEmail} placeholder="email address" type="email" />
          <button onClick={() => this.props.handleAddFriend(this.friendEmail.current.value)} className="invite-btn" >Add Friend</button>
        </div>
      </section>
    );
  }
}

export default InviteFriends;
