import React, { Component } from 'react';
import { Link } from 'react-router'
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import { ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Avatar from 'material-ui/Avatar';

import { debounce } from 'throttle-debounce';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as SearchIssuesAction from '../actions/SearchIssues';

import { getFullDate } from '../lib';

const Loading = () => {
    return <img className='loader' src='/images/rolling.gif' role="presentation" />
}

const IssueItem = (props) => {

    const { title, user, number, created_at } = props.issue;

    return (
        <div>
            <ListItem
                leftAvatar={<Avatar src={user.avatar_url} role="presentation"/>}
                primaryText={<Link to={'/issues/' + number}>{title}</Link>}
                secondaryText={
                    <div className='issue-info'>
                        <span>#{number} opened {getFullDate(created_at)}  by <Link to={user.html_url} target='_blank'>{user.login}</Link></span>
                    </div>
                }
                secondaryTextLines={1}
            />
            <Divider inset={true} />       
        </div>
    )
}

export class SearchIssues extends Component {
    constructor(props) {
        super(props)
        this.handleSearch = this.handleSearch.bind(this)
    }

    search = debounce(600, (q) => {
        this.props.actions.search({q: q});
    })

    handleSearch() {
        const user = this.userInput.input.value;
        const repo = this.repoInput.input.value;

        this.search({
            user: user,
            repo: repo
        })
    }
    render() {
        return (
            <MuiThemeProvider>
                <Paper>
                    <form>
                        <div>
                            <TextField 
                                ref={(input) => { this.userInput = input }}
                                fullWidth={Boolean('true')}
                                hintText="reactjs"
                                floatingLabelText="Введите имя пользователя"  
                            />
                        </div>
                         <div>
                            <TextField 
                                ref={(input) => { this.repoInput = input }}
                                fullWidth={Boolean('true')}
                                hintText="redux"
                                floatingLabelText='Введите название репозитория' 
                            />
                        </div>
                        <RaisedButton label='Поиск' primary={true} onClick={this.handleSearch} />
                    </form>
                    {
                        this.props.issues.loading 
                        ? 
                        <Loading />
                        :
                        !this.props.issues.loading && this.props.issues.search_results.map((issue, indx) => {
                            return <IssueItem key={indx} issue={issue} />    
                        })
                    }
                </Paper>   
            </MuiThemeProvider>
        )
    }
}

let mapStateToProps = (state) => {
  return {
    issues: state.issues
  }
}

let mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(SearchIssuesAction, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchIssues)
