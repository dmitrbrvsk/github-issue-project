import React from 'react'
import SearchIssues from '../SearchIssues'
import Header from '../../components/Header'

import '../../styles/common.scss'

const App = () => (
	<div className='App'>
		<Header />
		<div className='wrapper'>
			<SearchIssues />
		</div>
	</div>
)

export default App
