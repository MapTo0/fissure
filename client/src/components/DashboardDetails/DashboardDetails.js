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
    const exampleBill = {
      description: "asdf",
      cost: "123.22",
      categoryId: "5b252fd3d8282fce558cca39",
      memberId: "",
      groupId: "5b263e50f54a5374687796d9",
      paidBy: "asdfasdf",
      note: "asdf",
      paymenDate: Date.now(),
      expenses: "asdf"
    }

    this.fetchData('POST', 'http://localhost:8080/api/v1/bills', exampleBill)
      .then(data => {

        debugger;
      })
      .catch(error => {
        debugger;
      });
  }
  
  fetchData(method, url, data) {
    // Default options are marked with *
    return fetch(url, {
      body: JSON.stringify(data), // must match 'Content-Type' header
      headers: {
        'user-agent': 'Mozilla/4.0 MDN Example',
        'content-type': 'application/json',
        'Authorization': `Bearer ${window.localStorage["prosplitter-token"]}`
      },
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, cors, *same-origin
    })
      .then(response => response.json()) // parses response to JSON
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
