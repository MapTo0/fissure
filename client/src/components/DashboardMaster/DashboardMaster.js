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


class DashboardMaster extends Component {

  constructor(props) {
    super(props);

    this.newGroupref = React.createRef();
    this.state = {
      isAddGroupModalOpen: false,
      bills: [
        {
          "date": "10/16/2016",
          "description": "Id cupidatat proident ullamco qui sint voluptate fugiat.",
          "group": "Family",
          "paidBy": "Tereza",
          "owedByYou": "200 BGN"
        }
      ], // TODO ..
      groups: [{
        "text": "Group 1",
        "id": 1
      }, {
        "text": "Group 2",
        "id": 2
      }, {
        "text": "Group 3",
        "id": 3
      }],
      friends: [{
        text: "Martin Hristov",
        id: 1
      }, {
        text: "Adrian Bobev",
        id: 2
      }, {
        text: "Tereza Chobanova",
        id: 3
      }
      ]
    }
  }

  showAddGroupModal() {
    this.setState({
      ...this.state,
      isAddGroupModalOpen: true
    })
  }

  handleDialogClose() {
    this.setState({
      ...this.state,
      isAddGroupModalOpen: false
    });
  }

  addGroup() {
    const newGroupName = this.newGroupref.current.value;

    this.setState({
      ...this.state,
      groups: [...this.state.groups, {
        "text": newGroupName,
        "id": parseInt(Math.random())
      }],
      isAddGroupModalOpen: false
    });
  }

  showAddFriendModal() {
  }

  handleAddFriend(email) {
    // TODO - call service
    this.setState({
      ...this.state,
      friends: [...this.state.friends, { text: email, id: Math.random() }]
    })
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
            <div className="search-icon">
              <Search />
            </div>
            <input />
          </div>
        </div>

        <div className="option all-activities">
          <Link to="/all" className="unstyled-a">
            <List />
            <span className="option-text">All expenses</span>
          </Link>
        </div>

        <SideList title="Groups" iconType={<Label />} items={
          this.state.groups
        } collectionPath="groups" handleAdd={this.showAddGroupModal.bind(this)} />

        <SideList title="Friends" iconType={<Person />} items={
          this.state.friends
        } collectionPath="friends" hideAdd={true} />

        <InviteFriends handleAddFriend={this.handleAddFriend.bind(this)}/>

        <Modal
          isOpen={this.state.isAddGroupModalOpen}
          ariaHideApp={false}
          style={customStyles}>

          <div className="add-bill-modal-info equal-padding">
            <input ref={this.newGroupref} className="add-bill-modal-input" placeholder="Enter group name" />
          </div>

          <footer className="add-bill-modal-footer borderless">
            <button onClick={this.handleDialogClose.bind(this)} className="add-bill-modal-footer-btn left-btn">Cancel</button>
            <button onClick={this.addGroup.bind(this)} className="add-bill-modal-footer-btn teal-btn">Save</button>
          </footer>
        </Modal>
      </aside>
    );
  }
}

export default DashboardMaster;
