import React, { Component } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';

export default class ReposList extends Component {
    state = { currItemIndx: null }

    handleClick = (repo, indx) => {
        this.setState({ currItemIndx: indx });
        this.props.handleSearchIssue(repo);
    }

    render() {
        const repos = this.props.repos;
        const currItemIndx = this.state.currItemIndx
        return (
            <Scrollbars 
                autoHeight 
                autoHeightMax={300}  
                style={{ width: 700 }}
            >
                {
                    repos.map((repo, indx) => {
                        return <li key={indx} className={'list-repos-item ' + (currItemIndx === indx ? 'selected' : '')} onClick={this.handleClick.bind(this, repo, indx)}>{repo}</li>
                    })
                }
            </Scrollbars>
        )
    }
}