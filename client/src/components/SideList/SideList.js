import React, { Component } from 'react';
import './SideList.css';
import {
  Link
} from 'react-router-dom';

class SideList extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="side-list" >
        <header className="side-list-header">
          <span>{this.props.title}</span>
          <span style={{"cursor": "pointer"}} onClick={this.props.handleAdd}>{this.props.hideAdd ? "" : "+ add"}</span>
        </header>
        <ul className="side-list-content">
          {this.props.items.map(item => {
            return (
            <li 
              data-group-id={item.id}
              className="side-listitem"
            >
              <Link className="unstyled-a" to={"/" + this.props.collectionPath + "/" + item.id }>
                {this.props.iconType}
                <span className="greys">{item.text}</span>
              </Link>
            </li>);
          }) }
        </ul>
      </div>
    );
  }
}

export default SideList;
