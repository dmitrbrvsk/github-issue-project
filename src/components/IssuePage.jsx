import React, { Component }  from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as contentActions from '../actions/IssuePage';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Card, CardHeader, CardText} from 'material-ui/Card';
import Paper from 'material-ui/Paper';

import Header from './Header.jsx'
import Loader from './Loader.jsx';
import { getFullDate } from '../lib';

class Issue extends Component {
  render() {
    const issue = this.props.issue;
    const user = issue.user || {};
    const userLogin = user.login;
    const userAvatar = user.avatar_url;

    return (
      <div className='issue-page'>
        <div className='wrapper'>
          <MuiThemeProvider>
            <Paper>
              <Card>
                <CardHeader
                  title={issue.title + ' #' + issue.number}
                  subtitle={userLogin + ' opened ' + getFullDate(issue.created_at)}
                  avatar={userAvatar}
                />
                <CardText>
                  {issue.body}
                </CardText>
              </Card>
            </Paper>   
          </MuiThemeProvider>
        </div>
      </div>
    )
  }
}

class IssuesPage extends Component {
    componentDidMount() {
      const { id, user, repo } = this.props.params;

      this.props.actions.load_ussue({
        id: id,
        user: user,
        repo: repo
      });
    }

    render() {
      return (
        <div className='main-container'>
          <Header />
          {
            this.props.issue.loading 
            ? 
            <Loader />
            :
            !this.props.issue.loading && this.props.issue.loaded_issue && 
              <Issue issue={this.props.issue.loaded_issue }/>
          }
        </div>
      )
    }
}

let mapStateToProps = (state) => {
  return {
    issue: state.page_issue
  }
}

let mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(contentActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(IssuesPage);