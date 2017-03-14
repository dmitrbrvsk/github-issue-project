import React, { Component } from 'react';
import { Link } from 'react-router';
import { ListItem } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import Divider from 'material-ui/Divider';

import { getFullDate } from '../lib';

class IssueItem extends Component {
    render() {
        const { title, user, number, created_at, state } = this.props.issueData;
        const { searchUser, searchRepo } = this.props;
        return (
            <div>
                <ListItem
                    leftAvatar={<Avatar src={user.avatar_url} role="presentation"/>}
                    primaryText={<Link to={'/' + searchUser + '/' + searchRepo +  '/issues/' + number}>{title}</Link>}
                    secondaryText={
                        <div className='issue-info'>
                            <span>
                                #{number} opened {getFullDate(created_at)} by <Link to={user.html_url} target='_blank'>{user.login}</Link> status: {state}
                            </span>
                        </div>
                    }
                    secondaryTextLines={1}
                />
                <Divider inset={true} />       
            </div>
        )
    }
}

export default class IssueList extends Component {
    render() {
        const { issueList, searchUser, searchRepo } = this.props;
        return (
            <div className='issue_list'>
                {issueList.map((issue, indx) => {
                    return <IssueItem
                        key={indx} 
                        issueData={issue} 
                        searchUser={searchUser}
                        searchRepo={searchRepo}
                    />
                })}
            </div>
        )
    }
}