import React, { Component } from 'react';
import { Link } from 'react-router';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import { ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Avatar from 'material-ui/Avatar';
import ReactPaginate from 'react-paginate';

import { debounce } from 'throttle-debounce';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as SearchIssuesAction from '../actions/SearchIssues';

import { getFullDate } from '../lib';
import Loader from './Loader.jsx';

class IssueItem extends Component {
    render() {
        const { title, user, number, created_at } = this.props.issueData;
        const { searchUser, searchRepo } = this.props.searchData;

        return (
            <div>
                <ListItem
                    leftAvatar={<Avatar src={user.avatar_url} role="presentation"/>}
                    primaryText={<Link to={'/' + searchUser + '/' + searchRepo +  '/issues/' + number}>{title}</Link>}
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
}

class IssueList extends Component {
    render() {
        const { issueList, searchData } = this.props;

        return (
            <div className='issue_list'>
                {issueList.map((issue, indx) => {
                    return <IssueItem
                        key={indx} 
                        issueData={issue} 
                        searchData={searchData}
                    />
                })}
                <ReactPaginate 
                    previousLabel={"previous"}
                    nextLabel={"next"}
                    breakLabel={<a href="">...</a>}
                    breakClassName={"break-me"}
                    pageCount={10}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={this.handlePageClick}
                    containerClassName={"pagination"}
                    subContainerClassName={"pages pagination"}
                    activeClassName={"active"}
                    pageClassName={"pagination-item"}
                    pageLinkClassName={'pagination-item-link'} 
                />
            </div>
        )
    }
}

class SearchIssues extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            searchData: {
                searchUser: null, 
                searchRepo: null,
            },
            offset: 0,
            perPage: 5,
            disibledSearchBtn: true
        };
    }

    search = debounce(600, (q) => {
        this.props.actions.search({q: q});
        // this.setState({pageCount: Math.ceil(5 / this.state.perPage)});
    })

    handleSearch = () => {
        const user = this.userInput.input.value;
        const repo = this.repoInput.input.value;

        this.setState({ 
            searchData: {
                searchUser: user,
                searchRepo: repo,
            }
        });

        this.search({
            user: user,
            repo: repo,
            limit: this.state.perPage, 
            offset: this.state.offset
        })
    }

    handleValidateForm = () => {
        let disibledSearchBtn = !(this.userInput.input.value.length > 0 && this.repoInput.input.value.length > 0);
        this.setState({ disibledSearchBtn: disibledSearchBtn });
    }

    handlePageClick = (data) => {
        const selected = data.selected;
        const offset = Math.ceil(selected * this.state.perPage);
        this.setState({ offset: offset }, () => this.handleSearch());
    }; 

    render() {
        return (
            <MuiThemeProvider>
                <Paper>
                    <form className='form-search'>
                        <TextField 
                            className='fs-input'
                            onChange={this.handleValidateForm}
                            ref={(input) => { this.userInput = input }}
                            fullWidth={true}
                            hintText="reactjs"
                            floatingLabelText="Введите имя пользователя"  
                        />
                        <TextField 
                            className='fs-input'
                            onChange={this.handleValidateForm}
                            ref={(input) => { this.repoInput = input }}
                            fullWidth={true}
                            hintText="redux"
                            floatingLabelText='Введите название репозитория' 
                        />
                        <RaisedButton
                            className='fs-button' 
                            label='Поиск' 
                            primary={true}
                            fullWidth={true} 
                            onClick={this.handleSearch}
                            disabled={this.state.disibledSearchBtn} 
                        />
                    </form>
                    {
                        this.props.issues.loading 
                        ? 
                        <Loader />
                        :
                        !this.props.issues.loading && this.props.issues.search_results.length > 0 && 
                            <IssueList issueList={this.props.issues.search_results} searchData={this.state.searchData} />
                    }
                </Paper>   
            </MuiThemeProvider>
        )
    }
}

let mapStateToProps = (state) => {
  return {
    issues: state.search_issues
  }
}

let mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(SearchIssuesAction, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchIssues)
