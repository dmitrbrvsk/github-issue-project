import React, { Component } from 'react';
import SearchIssues from '../components/SearchIssues.jsx';
import Header from '../components/Header.jsx';

import '../styles/common.styl';

export default class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <div className='wrapper'>
          <SearchIssues />
        </div>
      </div>
    );
  }
}
