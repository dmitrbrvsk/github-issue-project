import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';

const Header = () => (
    <MuiThemeProvider>
        <AppBar title="React Github Issues" showMenuIconButton={false} />
    </MuiThemeProvider>
)

export default Header;