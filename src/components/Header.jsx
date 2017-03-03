import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';

export default class Header extends Component {
    render() {
        const style = {textAlign: 'center'}
        return (
             <MuiThemeProvider>
                 <AppBar
                    title="Search Issues GitHub"
                    titleStyle={style}
                />
            
             </MuiThemeProvider>    
        )
    }
}