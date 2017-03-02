import React, { Component } from 'react';
import { debounce } from 'throttle-debounce';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import TextField from 'material-ui/TextField';

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as headerActions from '../actions/issues'

export class Header extends Component {
    constructor(props) {
        super(props)
        this.handleChange = this.handleChange.bind(this)
    }


    search = debounce(600, (q) => {
        this.props.actions.search({q: q});
    })

    handleChange(e) {
        e.preventDefault()
        this.search(e.target.value)
    }
    render() {
        return (
            <MuiThemeProvider>
                <Paper>
                    <form>
                        <div>
                            <TextField hintText='Введите имя пользователя' onChange={this.handleChange} />
                        </div>
                         <div>
                            <TextField hintText='Введите название репозитория' />
                        </div>
                        <RaisedButton label='Поиск' primary={true} />
                    </form>
                </Paper>   
            </MuiThemeProvider>
        )
    }
}

let mapStateToProps = (state) => {
  return {
    header: state.header
  }
}

let mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(headerActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)
