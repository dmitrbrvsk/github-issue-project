import React from 'react'
import { Link } from 'react-router'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import AppBar from 'material-ui/AppBar'

const Header = () => (
	<div className='header'>
		<MuiThemeProvider>
			<AppBar
				title={ <Link to='/' className='header-link'>Search Issues GitHub</Link> }
				showMenuIconButton={ false }
			/>
		</MuiThemeProvider>
	</div>
)

export default Header

