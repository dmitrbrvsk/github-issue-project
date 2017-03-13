import React, { Component } from 'react';
import { Link } from 'react-router';
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
import * as SearchReposAction from '../actions/SearchRepos';

import { getFullDate } from '../lib';
import Loader from './Loader.jsx';

class IssueItem extends Component {
    render() {
        const { title, user, number, created_at, state } = this.props.issueData;
        const { searchUser, searchRepo } = this.props;
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
        const { issueList, searchUser, searchRepo } = this.props;
        return (
            <div className='issue_list'>
                {issueList.map((issue, indx) => {
                    return <IssueItem
                        key={indx} 
                        issueData={issue} 
                        searchUser={searchUser}
                        searchRepo={searchRepo}
                    />
                })}
            </div>
        )
    }
}

class ListRepos extends Component {
    handleClick = (repo) => {
        this.props.handleSearchIssue(repo);
    }

    render() {
        const repos = this.props.repos;
        return (
            <ul>
                {
                    repos.map((repo, indx) => {
                        return <li key={indx} onClick={this.handleClick.bind(this, repo)}>{repo}</li>
                    })
                }
            </ul>
        )
    }
}

class SearchIssues extends Component {

    state = { 
        searchUser: null, 
        searchRepo: null,
        offset: 0,
        perPage: 5,
        dataRepos: [],
    }

    componentWillReceiveProps(nextProps) {
        const searchRepos = nextProps.repos.search_results;
        if (searchRepos) {
            const namesRepos = searchRepos.map(repo => repo.name);
            this.setState({
                dataRepos: namesRepos
            });
        } 
    }

    searchRepos = debounce(600, (q) => {
        this.props.actions.searchRepos({q: q});
    })

    searchIssues = debounce(600, (q) => {
        this.props.actions.searchIssues({q: q});
        // this.setState({pageCount: Math.ceil(total_count / this.state.perPage)}); TODO HOW TO GET COUNT iSSUES API GITHUB
    })

    handleSearchRepos = (e) => {
        const user = e.target.value;
        this.setState({ 
            searchUser: user
        });  

        this.searchRepos(user);
    }

    handleSearchIssue = (repo) => {
        if(repo) {
            this.setState({ 
                searchRepo: repo
            });
        }
        const { searchUser, perPage, offset } =  this.state;

        console.log(repo)


        //console.log(searchRepo)

        this.searchIssues({
            user: searchUser,
            repo: repo || this.state.searchRepo,
            limit: perPage, 
            offset: offset
        }) 
    }

    handlePageClick = (data) => {
        const selected = data.selected;
        const offset = Math.ceil(selected * this.state.perPage);
        console.log(selected);
        console.log(offset)
        this.setState({ offset: offset }, () => this.handleSearchIssue());
    }

    handleUpdateCountIssue = (e) => {
        const countIssue = e.target.value;
        this.setState({ perPage: countIssue }, () => {
            if (!this.state.disibledSearchBtn) this.handleSearch()
        });
    }

    render() {
        const isVisiblePagination = (!this.props.issues.loading && this.props.issues.search_results.length > 0) ? 'show-pagination' : '';
        const repos  = this.state.dataRepos;
        return (
            <MuiThemeProvider>
                <Paper>
                    <form className='form-search'>
                        <TextField
                            hintText="reactjs"
                            
                            onChange={this.handleSearchRepos}
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
                    {this.props.repos.loading ? <Loader /> : <ListRepos repos={repos} handleSearchIssue={this.handleSearchIssue}/>} 

                    {this.props.issues.loading ? ( 
                        <Loader />
                    )   :   ( 
                        !this.props.issues.loading && this.props.issues.search_results.length > 0 &&
                            <IssueList 
                                issueList={this.props.issues.search_results} 
                                searchUser={this.state.searchUser}
                                searchRepo={this.state.searchRepo}  
                            /> 
                         
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
  return {
    actions: bindActionCreators({...SearchIssuesAction, ...SearchReposAction}, dispatch)
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(SearchIssues)
