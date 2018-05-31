import React from 'react'
import SearchIssues from '../components/SearchIssues'
import Header from '../components/Header'

import '../styles/common.styl'

const App = () => (
	<div className='App'>
		<Header />
		<div className='wrapper'>
			<SearchIssues />
		</div>
	</div>
)

export default App
