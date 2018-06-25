import React, { Component } from 'react';
import './DashboardDetails.css';
import Face from 'material-ui-icons/Face';
import Modal from 'react-modal';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '360px',
    padding: '0'
  }
};
class DashboardDetails extends Component {
  
  constructor(props) {
    super(props);
    
    this.state = {
      modalIsOpen: false
    }
  }

  openAddBillModal() {
    this.setState({
      ...this.state,
      modalIsOpen: true
    });
  }

  closeAddBillModal() {
    this.setState({
      ...this.state,
      modalIsOpen: false
    });
  }

  recordBill() {
    // call service and update model

    this.setState({
      ...this.state,
      modalIsOpen: false
    });
  }
  
  render() {
    return (
      <section className="dashboard-main">
        <header className="dashboard-view-header">
          <h2 className="dashboard-heading2" >Dashboard</h2>
          <div className="dashboard-actions">
            <button onClick={this.openAddBillModal.bind(this)} className="action-btn orange">Add bill</button>
            <button className="action-btn teal">Settle up</button>
          </div>
        </header>

        <div className="dashboard-subheader">
          <div className="cell">
            <span className="label">total balance</span>
            <span>BGN 404.34</span>
          </div>
          <div className="cell">
            <span className="label">you owe</span>
            <span>BGN 123.34</span>
          </div>
          <div className="cell">
            <span className="label">you are owed</span>
            <span>BGN 34.34</span>
          </div>
        </div>

        <div className="dashboard-tab-content">
          <header className="dashboard-tab-content-header">
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
        ariaHideApp={false}
        style={customStyles}>
        <div className="add-bill-modal-wrapper">
          <header className="add-bill-modal-header">
            <span className="add-bill-modal-title">Add a bill</span>
            <button className="add-bill-modal-close-btn" onClick={this.closeAddBillModal.bind(this)}>X</button>
          </header>
          <div className="add-bill-modal-content">
            <div className="add-bill-modal-person" >
              <span>With you and:</span>
              <input />
            </div>

            <div className="add-bill-modal-info">
              <input className="add-bill-modal-input" placeholder="Enter description"/>
              <input className="add-bill-modal-input" placeholder="Enter category"/>
              <input className="add-bill-modal-input" placeholder="Enter amount"/>
            </div>

            <footer className="add-bill-modal-footer">
              <button onClick={this.closeAddBillModal.bind(this)} className="add-bill-modal-footer-btn left-btn">Cancel</button>
              <button onClick={this.recordBill.bind(this)} className="add-bill-modal-footer-btn teal-btn">Save</button>
            </footer>
          </div>
        </div>
      </Modal>
      </section>

    );
  }
}

export default DashboardDetails;
