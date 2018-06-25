import React, { Component } from 'react';
import './All.css';
import EventNote from 'material-ui-icons/EventNote';

class All extends Component {
  constructor(props) {
    super(props);
  }

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

            {this.props.bills.map(expense => {
              return (<li className="expense-list-item flex">
                <div className="expense-date-container flex column center-all">
                  <div classNme="expense-date-month">{expense.date}</div>
                  <div className="expense-date-number">{expense.date}</div>
                </div>
                <div className="expense-description-container">
                  <span className="expense-description">{expense.text}</span>
                  <span className="expense-group">{expense.group}</span>
                </div>
                <div className="owe-details flex">
                  <div className="paid-by owe-details-cell flex column">
                    <span className="pay-person">{expense.paiedBy}</span>
                    <span className="pay-amoubt">{expense.amount}</span>
                  </div>

                  <div className="borrowed-by owe-details-cell flex column">
                    <span className="pay-person">{expense.paiedBy + "lent you"}</span>
                    <span className="pay-amoubt">{expense.owe}</span>
                  </div>
                </div>
              </li>)
            })}
          </ul>
        </main>
      </div>
    );
  }
}

export default All;
