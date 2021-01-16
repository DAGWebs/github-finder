import React from 'react'
import PropTypes from 'prop-types';

const RepoItem = ({ repo }) => {
    return (
        <div className="card">
            <h3>
                <a href={repo.html_url}>{repo.name}</a>
            </h3>
            {repo.description ? (<p>{repo.description}</p>) : (<p>No Repos Description Found!</p>)}
        </div>
    )
}

RepoItem.propTypes = {
    repo: PropTypes.object.isRequired,
}

export default RepoItem