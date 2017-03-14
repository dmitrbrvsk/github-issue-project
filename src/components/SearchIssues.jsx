import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import ReactPaginate from 'react-paginate';

import { debounce } from 'throttle-debounce';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as SearchIssuesAction from '../actions/SearchIssues';
import * as SearchReposAction from '../actions/SearchRepos';

import Loader from './Loader.jsx';
import IssueList from './IssueList.jsx';
import ReposList from './ReposList.jsx';

class SearchIssues extends Component {

    state = { 
        searchUser: null, 
        searchRepo: null,
        offset: 0,
        perPage: 5,
        dataRepos: [],
    }

    componentWillMount() {
        this.props.actions.clearIssues() && this.props.actions.clearRepos();
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
        const newRepoSearchIssue = repo;
        const { searchUser, perPage, offset } =  this.state;
        
        if(newRepoSearchIssue) {
            this.setState({ 
                searchRepo: newRepoSearchIssue
            });
        }

        this.searchIssues({
            repo: newRepoSearchIssue || this.state.searchRepo,
            user: searchUser,
            limit: perPage, 
            offset: offset
        }) 
    }

    handlePageClick = (data) => {
        const selected = data.selected;
        const offset = Math.ceil(selected * this.state.perPage);
        this.setState({ offset: offset }, () => this.handleSearchIssue());
    }

    handleUpdateCountIssue = (e) => {
        const countIssue = e.target.value.replace(/[^\d]/g, '');
        e.target.value = countIssue;

        this.setState({ perPage: countIssue }, () => {
            this.handleSearchIssue();
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
                    {this.props.repos.loading ? <Loader /> : <ReposList repos={repos} handleSearchIssue={this.handleSearchIssue}/>} 

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
