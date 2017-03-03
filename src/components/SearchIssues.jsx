import React, { Component } from 'react';
import { debounce } from 'throttle-debounce';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import { List } from 'material-ui/List';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as SearchIssuesAction from '../actions/SearchIssues';


import { ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Avatar from 'material-ui/Avatar';

const IssueItem = (props) => (
    <div>
        <ListItem
            leftAvatar={<Avatar src="images/ok-128.jpg" />}
            primaryText="Brunch this weekend?"
            secondaryText={
                <p>
                <span>Brendan Lim</span> --
                I&apos;ll be in your neighborhood doing errands this weekend. Do you want to grab brunch?
                </p>
            }
            secondaryTextLines={2}
        />
        <Divider inset={true} />       
    </div>
);

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
                                fullWidth='true'
                                hintText="reactjs"
                                floatingLabelText="Введите имя пользователя"  
                            />
                        </div>
                         <div>
                            <TextField 
                                ref={(input) => { this.repoInput = input }}
                                fullWidth='true' 
                                hintText="redux"
                                floatingLabelText='Введите название репозитория' 
                            />
                        </div>
                        <RaisedButton label='Поиск' primary={true} onClick={this.handleSearch} />
                    </form>
                    
                    {
          console.log(this.props.issue)
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
