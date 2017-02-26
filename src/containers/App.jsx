import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header.jsx';

class App extends Component {
  render() {
    fetch('https://api.github.com/users/reactjs/repos')
  .then(function(response) {
    return response.json()
  }).then(function(json) {
    console.log('parsed json', json)
  }).catch(function(ex) {
    console.log('parsing failed', ex)
  })
    console.log(this.props);
    return (
      <div className="App">
        <Header />
        <ul>
        {this.props.issues.map((el, id) => 
            <li key={id}>{el}</li>
        )}
        </ul>
      </div>
    );
  }
}

export default connect(
  state => ({
    issues: state.issues
  }),
  dispatch => ({})
)(App);
