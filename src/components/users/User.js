import React, { Fragment, Component } from 'react';
import Spinner from '../layout/Spinner';
import Repos from '../repos/Repos'
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export class User extends Component {
    static propTypes = {
        loading: PropTypes.bool,
        user: PropTypes.object.isRequired,
        repos: PropTypes.array.isRequired,
        getUser: PropTypes.func.isRequired,
        getUserRepos: PropTypes.func.isRequired,
    }

    componentDidMount() {
        this.props.getUser(this.props.match.params.login);
        this.props.getUserRepos(this.props.match.params.login);
    }

    render() {
        const{
            name,
            avatar_url,
            location,
            bio,
            company,
            website,
            blog,
            html_url,
            login,
            followers,
            following,
            public_repos,
            public_gists,
            hireable
        } = this.props.user

        const { loading, repos } = this.props;
        if(loading) return <Spinner />
        return (
            <Fragment>
                <Link to='/' className='btn btn-light'>Back To Search</Link>
                Hireable: {' '}
                {hireable ? <i className='fas fa-check text-success' /> : <i className="fas fa-times-circle text-danger" />}
                <div className="card grid-2">
                    <div className="all-center">
                        <img src={avatar_url} className="round-img" alt="" style={{ width: '150px' }} />
                        {name ? <h3>{name}</h3> : <h3>{login}</h3> }
                        <p>Location: {location ? (<small><strong>{location}</strong></small>) : (<small><strong>No Location has been set!</strong></small>)} </p>
                    </div>
                    <div>
                        {bio ? (<Fragment><h3>Bio</h3><p>{bio}</p></Fragment>) : (<Fragment><h3>Bio</h3><p>No bio has been set for this user!</p></Fragment>)}
                        <a href={html_url} className="btn btn-dark my-1">Visit Github Profile</a>
                        <ul>
                            <li>
                                {login && <Fragment>
                                    <strong>Username: </strong> {login}
                                </Fragment>}
                            </li>
                            <li>
                                {company && <Fragment>
                                    <strong>Company: </strong> {company}
                                </Fragment>}
                            </li>
                            <li>
                                {website && <Fragment>
                                    <strong>Website: </strong> {blog}
                                </Fragment>}
                            </li>
                        </ul>
                    </div>
                </div>
                <div className='card text-center'>
                    <div className="badge badge-primary">Followers: {followers}</div>
                    <div className="badge badge-success">Following: {following}</div>
                    <div className="badge badge-primary">Public Repos: {public_repos}</div>
                    <div className="badge badge-primary">Public Gists: {public_gists}</div>
                </div>
                <Repos repos={repos} />
            </Fragment>
            
        )
    }
}

export default User
