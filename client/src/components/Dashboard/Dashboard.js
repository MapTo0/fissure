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

    // this.activeTab = props.location.pathname.substr(1, props.location.pathname.length);
  }

  componentDidUpdate() {
    // this.activeTab = arguments[0].location.pathname.substr(1, arguments[0].location.pathname.length); 
  }

  render() {
    return (
      <div className="dashboard">
        <Header />
        <div className="dashboard-content">
          <DashBoardMaster activeTab={this.activeTab}/>

          <section className="details-content">
            <Switch>
              <Route path='/dashboard' component={DashboardDetails} />
              <Route path='/activity' component={Activity} />
              <Route path='/all' component={All} />
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
