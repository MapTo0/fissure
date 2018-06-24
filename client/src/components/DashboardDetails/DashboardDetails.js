import React, { Component } from 'react';
import './DashboardDetails.css';
import Face from 'material-ui-icons/Face';
import Modal from 'react-modal';

class DashboardDetails extends Component {
  
  constructor(props) {
    super(props);
    
    this.state = {
      modalIsOpen: false
    }
  }
  
  render() {
    return (
      <section className="dashboard-main">
        <header className="dashboard-view-header">
          <h2 className="dashboard-heading2" >Dashboard</h2>
          <div className="dashboard-actions">
            <button className="action-btn orange">Add bill</button>
            <button className="action-btn teal">Settle up</button>
          </div>
        </header>

        <div className="dashboard-subheader">
          <div className="cell">
            <span class="label">total balance</span>
            <span>BGN 404.34</span>
          </div>
          <div className="cell">
            <span class="label">you owe</span>
            <span>BGN 123.34</span>
          </div>
          <div className="cell">
            <span class="label">you are owed</span>
            <span>BGN 34.34</span>
          </div>
        </div>

        <div className="dashboard-tab-content">
          <header class="dashboard-tab-content-header">
            <span>You owe</span>
            <span>You are owed</span>
          </header>

          <section className="dashboard-tab-content-main flex space-between">
            <div className="big-cell">
              <div className="owe-item">
                <Face />
                <div className="owe-item-content flex column">
                  <span>Tereza Chobanova</span>
                  <span className="owed oranges" >you owe BGN 212.33</span>
                </div>
              </div>
            </div>

            <div className="big-cell">
              <div className="owe-item">
                <Face />
                <div className="owe-item-content flex column">
                  <span>Tereza Chobanova</span>
                  <span className="owed teals" >you owe BGN 212.33</span>
                </div>
              </div>
              
              <div className="owe-item">
                <Face />
                <div className="owe-item-content flex column">
                  <span>Tereza Chobanova</span>
                  <span className="owed teals" >you owe BGN 212.33</span>
                </div>
              </div>
            </div>
          </section>
        </div>
      <Modal
        isOpen={this.state.modalIsOpen}
        // onAfterOpen={this.afterOpenModal}
        // onRequestClose={this.closeModal}
        // contentLabel="Example Modal"
      >

        <h1>Hello world</h1>
      </Modal>
      </section>

    );
  }
}

export default DashboardDetails;
