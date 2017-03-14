import React, { Component } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';

export default class ReposList extends Component {
    handleClick = (repo) => {
        this.props.handleSearchIssue(repo);
    }

    render() {
        const repos = this.props.repos;
        return (
            <Scrollbars 
                autoHeight 
                autoHeightMax={300}  
                style={{ width: 700 }}
            >
                {
                    repos.map((repo, indx) => {
                        return <li key={indx} className='list-repos-item' onClick={this.handleClick.bind(this, repo)}>{repo}</li>
                    })
                }
            </Scrollbars>
        )
    }
}