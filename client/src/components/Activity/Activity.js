import React, { Component } from 'react';
import './Activity.css';
import EventNote from 'material-ui-icons/EventNote';

class Activity extends Component {
  render() {
    return (
      <div className="activity">
        <header className="activity-header">
          <h2>Recent Activity</h2>
        </header>
        <div className="activity-content">
          <ul className="activity-list">
            <li className="activity-item flex">
              <EventNote />
              <div className="activity-info flex column">
                <span><strong>Tereza C.</strong> added <strong>"fasdfasdf"</strong> in "Family".</span>
                <span className="activity-amount oranges">You owe BGN 123.3</span>
                <span className="activity-date">03/06/2018</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default Activity;
