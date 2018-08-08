import React from 'react'
import { Link } from 'react-router-dom'
// import AppBar from 'material-ui/AppBar'
import { withStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'

const styles = {
	headerText: {
		display: 'flex',
		justifyContent: 'center'
	},
	headerBottom: {
		marginBottom: 30
	}
}

const Header = props => {
	const { classes } = props
	return (
		<AppBar
			className={ classes.headerBottom }
			position='static'
			color='default'
		>
			<Toolbar className={ classes.headerText }>
				<Typography
					variant='title'
					color='inherit'
				>
					<Link to='/'>Search Issues GitHub</Link>
				</Typography>
			</Toolbar>
		</AppBar>
	)
}

export default withStyles(styles)(Header)

