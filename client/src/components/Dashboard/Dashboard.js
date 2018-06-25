import React, { Component } from 'react';
import './Dashboard.css';
import Header from '../Header/Header'
import Activity from '../Activity/Activity'
import DashBoardMaster from '../DashboardMaster/DashboardMaster';
import All from '../All/All';
import DashboardDetails from '../DashboardDetails/DashboardDetails';
import {
  Route,
  Switch
} from 'react-router-dom'

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {},
      friends: {},
      bills: [
        {
          "date": "10/16/2016",
          "description": "Id cupidatat proident ullamco qui sint voluptate fugiat.",
          "group": "Family",
          "paidBy": "Tereza",
          "owedByYou": "200 BGN"
        }
      ]
    }
  }

  componentDidMount() {

    fetch('http://localhost:8080/api/v1/users/profile', {
      method: 'GET', // or 'PUT'
      headers: {
        'Content-Type': 'application/json'
      },
      headers: {
        'user-agent': 'Mozilla/4.0 MDN Example',
        'content-type': 'application/json',
        'Authorization': `Bearer ${window.localStorage["prosplitter-token"]}`
      },
    }).then(response => response.json()).then(data => {
      const receivedData = data.result.data;

      this.setState({
        ...this.state,
        user: {
          name: `${receivedData.attributes.firstname} ${receivedData.attributes.lastname}`
        }
      });


    })
      .catch(error => {
        alert('something went wrong');
      });

    fetch('http://localhost:8080/api/v1/friends/', {
      method: 'GET', // or 'PUT'
      headers: {
        'Content-Type': 'application/json'
      },
      headers: {
        'user-agent': 'Mozilla/4.0 MDN Example',
        'content-type': 'application/json',
        'Authorization': `Bearer ${window.localStorage["prosplitter-token"]}`
      },
    }).then(response => response.json()).then(data => {
      this.setState({
        ...this.state,
        friends: data.result
      })
    })
      .catch(error => {
        alert('something went wrong');
      });


    this.fetchBills();
  }

  fetchBills() {
    fetch('http://localhost:8080/api/v1/bills/', {
      method: 'GET', // or 'PUT'
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${window.localStorage["prosplitter-token"]}`
      },
    }).then(response => response.json()).then(data => {
      const bills = data.result.data;

      this.setState({
        ...this.state,
        bills: [...data.result.data]
      });
    })
      .catch(error => {
        alert('something went wrong');
      });
  }

  render() {
    return (
      <div className="dashboard">
        <Header user={this.state.user} />
        <div className="dashboard-content">
          <DashBoardMaster activeTab={this.activeTab} />

          <section className="details-content">
            <Switch>
              <Route path='/dashboard' component={DashboardDetails} />
              <Route path='/activity' component={Activity} />
              <Route path='/all' render={(props) => <All bills={this.state.bills} />} />
              <Route path='/groups/:id' component={Activity} />
              <Route render={() => (<h1>Not Found</h1>)} />
            </Switch>
          </section>

        </div>
      </div>
    );
  }
}

export default Dashboard;
