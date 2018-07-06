import React from 'react'
import { Link } from 'react-router-dom'
import { ListItem } from 'material-ui/List'
import Divider from 'material-ui/Divider'
import Avatar from 'material-ui/Avatar'
import { getFullDate } from '../lib'

const IssueItem = ({ issueData, searchData }) => {
	const { title, user, number, state } = issueData
	const createdAt = issueData.created_at
	const { searchUser, searchRepo } = searchData
	return (
		<div>
			<ListItem
				leftAvatar={ <Avatar src={ user.avatar_url } role='presentation' /> }
				primaryText={ <Link to={ `/${searchUser}/${searchRepo}/issues/${number}` }>{ title }</Link> }
				secondaryText={
					<div className='issue-info'>
						<span>
							#{number} opened {getFullDate(createdAt)} by
							<Link to={ user.html_url } target='_blank'>
								{ user.login }
							</Link>
							status: { state }
						</span>
					</div>
				}
				secondaryTextLines={ 1 }
			/>
			<Divider inset />
		</div>
	)
}

export default IssueItem

