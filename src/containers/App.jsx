import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header.jsx';

import '../styles/common.styl';

export default class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
      </div>
    );
  }
}
