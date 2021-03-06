import React, { Component, Fragment } from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import Search from './components/users/Search';
import Alert from './components/layout/Alert';
import About from './components/layout/pages/About';
import User from './components/users/User';
import axios from 'axios';
import './App.css';

class App extends Component {
  state = {
    users: [],
    user: {},
    loading: false,
    alert: null,
    repos: []
  }

  async componentDidMount() {
    var url = `https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`;

    this.setState({ loading: true })
    const res = await axios.get(url);
    console.log(url);
      
       this.setState({ users: res.data, loading: false })
  }

  searchUsers = async text => {
    this.setState({ loading: true })
    var url = `https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`;

    this.setState({ loading: true })
    const res = await axios.get(url);
    console.log(url);
      
       this.setState({ users: res.data.items, loading: false })
  }

  clearUsers = () => {
    this.setState({ users: [], loading: false });
  }

  setAlert = (msg, type) => {
    this.setState({ alert: { msg, type } });

    setTimeout(() => 
      this.setState({ alert: null }),
      5000
    );
  }

  getUser = async (username) => {
    this.setState({ loading: true })
    var url = `https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`;

    this.setState({ loading: true })
    const res = await axios.get(url);
    console.log(url);
      
       this.setState({ user: res.data, loading: false })
  }

  getUserRepos = async (username) => {
    this.setState({ loading: true })
    var url = `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`;

    this.setState({ loading: true })
    const res = await axios.get(url);
    console.log(url);
      
       this.setState({ repos: res.data, loading: false })
  }

  render() {
    const { users, user, loading, repos } = this.state;
    return (
      <Router>
        <div className="App">
          <Navbar />
          <div className="container">
            <Alert alert={this.state.alert} />
            <Switch>
              <Route exact path='/' render={props => (
                <Fragment>
                    <Search searchUsers={this.searchUsers} clearUsers={this.clearUsers} showClear={
                      this.state.users.length > 0 ? true : false
                    } setAlert={this.setAlert} />
                    <Users leading={loading} users={users} />
                </Fragment>
              )} />
              <Route exact path='/about' component={About} />
              <Route exact path='/user/:login' render={props => (
                <User { ...props } getUser={this.getUser} user={user} loading={loading} getUserRepos={this.getUserRepos} repos={repos} />
              )} />
            </Switch>
            
            
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
