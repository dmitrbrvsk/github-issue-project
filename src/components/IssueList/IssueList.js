import React from 'react'
import IssueItem from '../IssueItem'

const IssueList = ({ issueList, searchData }) => (
	<div className='issue_list'>
		{issueList.map(issue => {
			return (
				<IssueItem
					key={ issue.id }
					issueData={ issue }
					searchData={ searchData }
				/>
			)
		})}
	</div>
)

export default IssueList

