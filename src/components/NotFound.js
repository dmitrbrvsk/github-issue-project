import React from 'react'
import { Link } from 'react-router'

const style = {
	textAlign: 'center'
}

const NotFound = () => (
	<div style={ style }>
		<h1>
			Страница не найдена.
			<Link to='/'>Вернуться на главную?</Link>
		</h1>
		<img src='/images/404.jpg' alt='' />
	</div>
)

export default NotFound

