import React from 'react';
import PropTypes from 'prop-types';
import RepoItem from './RepoItem';

const repos = ({ repos }) => {
    return (
        repos.map(repo => <RepoItem repo={repo} key ={repo.id} />)
    )
}

repos.propTypes = {
    repos: PropTypes.array.isRequired,
}

export default repos
