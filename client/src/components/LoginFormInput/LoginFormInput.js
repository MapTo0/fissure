import React, { Component } from 'react';
import './LoginFormInput.css'

class LoginFormInput extends Component {

  constructor(props) {
    super(props);

    this.state = {
      value: ""
    }

  }

  onLiveChange(event) {
    this.setState({
      ...this.state,
      value: event.target.value
    })
  }

  render() {
    return (
      <div className={'input-div-wrapper' + (this.props.visible ? '' : ' hidden') }>
        {this.props.icon}
        <div className='input-wrapper'>
          <input className='input-inner' type={this.props.type} onChange={this.onLiveChange.bind(this)} placeholder={this.props.placeholder}/>
        </div>
     </div>
    );
  }
}

export default LoginFormInput;