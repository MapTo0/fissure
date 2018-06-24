import React, { Component } from 'react';
import './DashboardMaster.css';
import Home from 'material-ui-icons/Home';
import Flag from 'material-ui-icons/Flag';
import Search from 'material-ui-icons/Search';
import List from 'material-ui-icons/List';
import Label from 'material-ui-icons/Label';
import Person from 'material-ui-icons/Person';
import SideList from '../SideList/SideList';
import InviteFriends from '../InviteFriends/InviteFriends';
import {
  Link
} from 'react-router-dom';


class DashboardMaster extends Component {

  constructor(props) {
    super(props);

    this.state = {
      groups: ["Familiry", "More", "Other"],
      friends: ["Martin Hristov", "Adrian Bobev", "Tereza Chobanova"]
    }
  }

  render() {
    return (
      <aside className="left-side-content">
        <div className="side-options">
          <div className={"option dashboard-option " + (this.props.activeTab === "dashboard" ? "active" : "")}>
            <Link to="/dashboard" className="unstyled-a">
              <Home />
              <span className="option-text">Dashboard</span>
            </Link>
          </div>
          <div className={"option activity " + (this.props.activeTab === "activity" ? "active" : "")}>
            <Link to="/activity" className="unstyled-a">
              <Flag />
              <span className="option-text">Recent Activity</span>
            </Link>
          </div>
        </div>

        <div className="side-search">
          <div className="search-field" >
            <div class="search-icon">
              <Search />
            </div>
            <input />
          </div>
        </div>

        <div className="option all-activities">
          <List />
          <span className="option-text">All expenses</span>
        </div>
        
        <SideList title="Groups" iconType={<Label />} items={
          this.state.groups
        }/>

        <SideList title="Friends" iconType={<Person />} items={
          this.state.friends
        } />

        <InviteFriends />
      </aside>
    );
  }
}

export default DashboardMaster;
