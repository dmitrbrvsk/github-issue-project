import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import ReactPaginate from 'react-paginate';

import { debounce } from 'throttle-debounce';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as SearchIssuesAction from '../actions/SearchIssues';

import IssueList from './IssueList.jsx';
import Loader from './Loader.jsx';



class SearchIssues extends Component {
    
    state = { 
        searchData: {
            searchUser: null, 
            searchRepo: null,
        },
        offset: 0,
        perPage: 5,
        disibledSearchBtn: true
    }

    componentWillMount() {
        this.props.actions.clearIssues();
    }

    search = debounce(600, (q) => {
        this.props.actions.search({q: q});
        // this.setState({pageCount: Math.ceil(total_count / this.state.perPage)}); TODO HOW TO GET COUNT iSSUES API GITHUB
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
    }

    handleUpdateCountIssue = (e) => {
        const countIssue = e.target.value;
        this.setState({ perPage: countIssue }, () => {
            if (!this.state.disibledSearchBtn) this.handleSearch()
        });
    }

    render() {
        const isVisiblePagination = (!this.props.issues.loading && this.props.issues.search_results.length > 0) ? 'show-pagination' : '';

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
                        <TextField
                            defaultValue="5"
                            floatingLabelText="Количество элементов отображаемых на странице"
                            fullWidth={true}
                            onChange={this.handleUpdateCountIssue}
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
    issues: state.search_issues
  }
}

let mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(SearchIssuesAction, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchIssues)
