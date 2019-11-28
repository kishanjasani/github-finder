import React, { useState, Fragment } from 'react';
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import User from './components/users/User';
import Search from './components/users/Search';
import Alert from './components/layout/Alert';
import About from './components/routes/About';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import axios from 'axios';

import GithubState from './context/github/GithubState';

import './App.css';

const App = () => {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);

  // Search github Users


  // Get Single github user


  // Get User repos
  const getUserRepos = async (username) => {
    setLoading(true);

    const res = await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc`);

    setRepos(res.data);
    setLoading(false);
  }

  const showAlert = (msg, type) => {
    setAlert({ msg: msg, type: type });
    setTimeout(() => setAlert(null), 5000);
  }

  // async componentDidMount() {
  //   this.setState({ loading: true });

  //   const res = await axios.get('https://api.github.com/users');

  //   this.setState({ users: res.data, loading: false });
  // }

  return (
    <GithubState>
      <Router>
        <div className="App">
          <Navbar/>
          <div className="container">
            <Alert alert={alert} />
            <Switch>
              <Route exact path="/" render={props => (
                <Fragment>
                  <Search
                    setAlert={showAlert}
                  />
                  <Users />
                </Fragment>
              )} />
              <Route exact path='/about' component={About} />
              <Route exact path='/user/:login' render={
                props => (
                  <User
                    { ...props }
                    getUserRepos={getUserRepos}
                    repos={ repos }
                  />
                )}
              />
            </Switch>
          </div>
        </div>
      </Router>
    </GithubState>
  );
}

export default App;
