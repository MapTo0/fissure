import React, { Component } from 'react';
import './App.css';
import LoginFormContainer from '../LoginFormContainer/LoginFormContainer'
import Activity from '../Activity/Activity'
import Dashboard from '../Dashboard/Dashboard'
import DashboardDetails from '../DashboardDetails/DashboardDetails'
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect
} from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div className="App">

        <Router>
          <Switch>
            <Route path="/" exact={true} component={LoginFormContainer} />
            <Route component={Dashboard} />
          </Switch>
        </Router>

      </div>
    );
  }
}

export default App;
