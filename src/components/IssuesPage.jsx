import React, { Component }  from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as contentActions from '../actions/Issue';

class IssuesPage extends Component {

    componentWillMount() {
      this.props.actions.load_ussue();
    }

    render() {
      return (
          <div>IssuesPage {this.props.params.id}</div>
      )
    }
}

let mapStateToProps = (state) => {
  return {
    issue: state.issue
  }
}

let mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(contentActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(IssuesPage);