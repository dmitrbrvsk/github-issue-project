import React, { Component } from 'react';
import { Link } from 'react-router';
import Paper from 'material-ui/Paper';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import { ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Avatar from 'material-ui/Avatar';
import AutoComplete from 'material-ui/AutoComplete';
import ReactPaginate from 'react-paginate';

import { debounce } from 'throttle-debounce';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as SearchIssuesAction from '../actions/SearchIssues';
import * as SearchReposAction from '../actions/SearchRepos';

import { getFullDate } from '../lib';
import Loader from './Loader.jsx';

class IssueItem extends Component {
    render() {
        const { title, user, number, created_at, state } = this.props.issueData;
        const { searchUser, searchRepo } = this.props.searchData;
        return (
            <div>
                <ListItem
                    leftAvatar={<Avatar src={user.avatar_url} role="presentation"/>}
                    primaryText={<Link to={'/' + searchUser + '/' + searchRepo +  '/issues/' + number}>{title}</Link>}
                    secondaryText={
                        <div className='issue-info'>
                            <span>
                                #{number} opened {getFullDate(created_at)} by <Link to={user.html_url} target='_blank'>{user.login}</Link> status: {state}
                            </span>
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
            </div>
        )
    }
}

class SearchIssues extends Component {

    state = { 
        searchData: {
            searchUser: null, 
            searchRepo: null,
        },
        offset: 0,
        perPage: 5,
        disibledSearchBtn: true,
        dataSource: [],
    };

    search = debounce(600, (q) => {
        this.props.actions.searchRepos({q: q});
        // this.setState({pageCount: Math.ceil(total_count / this.state.perPage)}); TODO HOW TO GET COUNT iSSUES API GITHUB
    })

    handleSearchRepos = (value) => {
        console.log('value', value);
        const user = value;

        this.setState({ 
            searchUser: user,
        });  

        this.setState({
            dataSource: [
                value,
                value + value,
                value + value + value
            ],
        });

        this.search({
            user: user
        })
    }

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

    handlePageClick = (data) => {
        const selected = data.selected;
        const offset = Math.ceil(selected * this.state.perPage);
        this.setState({ offset: offset }, () => this.handleSearch());
    }

    handleUpdateCountIssue = (e) => {
        const countIssue = e.target.value;
        this.setState({ perPage: countIssue }, () => {
            if (!this.state.disibledSearchBtn) this.handleSearch()
        });
    }

    render() {
        const isVisiblePagination = (!this.props.issues.loading && this.props.issues.search_results.length > 0) ? 'show-pagination' : '';
        console.log(isVisiblePagination)
        return (
            <MuiThemeProvider>
                <Paper>
                    <form className='form-search'>
                        <AutoComplete
                            hintText="reactjs"
                            dataSource={this.state.dataSource}
                            onUpdateInput={this.handleSearchRepos}
                            floatingLabelText="Введите имя пользователя"
                            fullWidth={true}
                        />
                        <TextField
                            defaultValue="5"
                            floatingLabelText="Количество элементов отображаемых на странице"
                            fullWidth={true}
                            onChange={this.handleUpdateCountIssue}
                        />
                    </form>
                    {this.props.issues.loading ? ( 
                        <Loader />
                    )   :   ( 
                        !this.props.issues.loading && this.props.issues.search_results.length > 0 &&
                            <IssueList issueList={this.props.issues.search_results} searchData={this.state.searchData} /> 
                         
                    )}
                    <ReactPaginate 
                        previousLabel={"previous"}
                        nextLabel={"next"}
                        breakLabel={<a href="">...</a>}
                        breakClassName={"break-me"}
                        pageCount={10}
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={5}
                        onPageChange={this.handlePageClick}
                        containerClassName={"pagination " + isVisiblePagination}
                        subContainerClassName={"pages pagination"}
                        activeClassName={"active"}
                        pageClassName={"pagination-item"}
                        pageLinkClassName={'pagination-item-link'} 
                    />
                </Paper>   
            </MuiThemeProvider>
        )
    }
}

let mapStateToProps = (state) => {
  return {
    issues: state.search_issues,
    repos: state.search_repos
  }
}

let mapDispatchToProps = (dispatch) => {
  let actions = bindActionCreators(SearchIssuesAction, dispatch)
  console.log(actions);

  return {
    actions: bindActionCreators(SearchIssuesAction, dispatch)
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(SearchIssues)
