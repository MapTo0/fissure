import React, { Component } from 'react';
import './All.css';
import EventNote from 'material-ui-icons/EventNote';

class All extends Component {
  render() {
    return (
      <div className="expense-container">
        <header className="expense-container-header">
          <h2>All expenses</h2>
          <div className="expense-action-container">
            <button className="action-btn orange" >Add a bill</button>
            <button className="action-btn teal" >Settle up</button>
          </div>
        </header>

        <main className="expense-container-content">
          <ul className="unstyled-ul expenses-list">
            <li className="expense-list-item flex">
              <div className="expense-date-container flex column center-all">
                <div classNme="expense-date-month">JUN</div>
                <div className="expense-date-number">18</div>
              </div>
              <div className="expense-description-container">
                <span className="expense-description">Quis excepteur aute.</span>
                <span className="expense-group">Family</span>
              </div>
              <div className="owe-details flex">
                <div className="paid-by owe-details-cell flex column">
                  <span className="pay-person">Tereza C. paid</span>
                  <span className="pay-amoubt">BGN 245.00</span>
                </div>

                <div className="borrowed-by owe-details-cell flex column">
                  <span className="pay-person">Tereza lent you</span>
                  <span className="pay-amoubt">BGN 1234.00</span>
                </div>
              </div>
            </li>
          </ul>
        </main>
      </div>
    );
  }
}

export default All;
