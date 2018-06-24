import React, { Component } from 'react';
import './SideList.css';

class SideList extends Component {

  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="side-list" >
        <header className="side-list-header">
          <span>{this.props.title}</span>
          <span>+ add</span>
        </header>
        <ul className="side-list-content">
          {this.props.items.map(item => (<li className="side-listitem">{this.props.iconType}<span className="greys">{item}</span></li>)) }
        </ul>
      </div>
    );
  }
}

export default SideList;
