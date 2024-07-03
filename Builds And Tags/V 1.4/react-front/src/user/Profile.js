import React, { Component } from 'react';
import { isAuthenticated } from '../auth';
import { Redirect, Link } from 'react-router-dom';
import { read } from './apiUser';
import DefaultProfile from '../images/avatar.jpg';
import DeleteUser from './DeleteUser';
import FollowProfileButton from './FollowProfileButton';
import ProfileTabs from './ProfileTabs';
import { listByUser } from '../post/apiPost';
import './Profile.css'; // Import the CSS file

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      user: { following: [], followers: [] },
      redirectToSignin: false,
      following: false,
      error: '',
      posts: []
    };
  }

  // Check if user is followed
  checkFollow = user => {
    const jwt = isAuthenticated();
    const match = user.followers.find(follower => {
      return follower._id === jwt.user._id;
    });
    return match;
  };

  clickFollowButton = callApi => {
    const userId = isAuthenticated().user._id;
    const token = isAuthenticated().token;

    callApi(userId, token, this.state.user._id).then(data => {
      if (data.error) {
        this.setState({ error: data.error });
      } else {
        this.setState({ user: data, following: !this.state.following });
      }
    });
  };

  init = userId => {
    const token = isAuthenticated().token;
    read(userId, token).then(data => {
      if (data.error) {
        this.setState({ redirectToSignin: true });
      } else {
        let following = this.checkFollow(data);
        this.setState({ user: data, following });
        this.loadPosts(data._id);
      }
    });
  };

  loadPosts = userId => {
    const token = isAuthenticated().token;
    listByUser(userId, token).then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        this.setState({ posts: data });
      }
    });
  };

  componentDidMount() {
    const userId = this.props.match.params.userId;
    this.init(userId);
  }

  componentWillReceiveProps(props) {
    const userId = props.match.params.userId;
    this.init(userId);
  }

  render() {
    const { redirectToSignin, user, posts } = this.state;
    if (redirectToSignin) return <Redirect to="/signin" />;

    const photoUrl = user._id
      ? `${process.env.REACT_APP_API_URL}/user/photo/${user._id}?${new Date().getTime()}`
      : DefaultProfile;

    return (
      <div className="container profile-container">
        <h1 className="profile-title">Profile</h1>
        <div className="row profile-content">
          <div className="col-md-4 profile-image-section">
            <img
              className="profile-image"
              src={photoUrl}
              onError={i => (i.target.src = `${DefaultProfile}`)}
              alt={user.name}
            />
          </div>
          <div className="col-md-8 profile-details">
            <div className="profile-info">
              <p className="profile-name">Hello {user.name}</p>
              <p className="profile-email">Email: {user.email}</p>
              <p className="profile-joined">{`Joined ${new Date(user.created).toDateString()}`}</p>
            </div>
            {isAuthenticated().user && isAuthenticated().user._id === user._id ? (
              <div className="profile-actions">
                <Link className="btn btn-create-post" to={`/post/create`}>
                  Create Post
                </Link>
                <Link className="btn btn-edit-profile" to={`/user/edit/${user._id}`}>
                  Edit Profile
                </Link>
                <DeleteUser userId={user._id} />
              </div>
            ) : (
              <FollowProfileButton
                following={this.state.following}
                onButtonClick={this.clickFollowButton}
              />
            )}
            {isAuthenticated().user && isAuthenticated().user.role === 'admin' && (
              <div className="card admin-card mt-5">
                <div className="card-body">
                  <h5 className="card-title text-danger">Admin</h5>
                  <p className="text-danger">Edit/Delete as an Admin</p>
                  <Link className="btn btn-edit-profile" to={`/user/edit/${user._id}`}>
                    Edit Profile
                  </Link>
                  <DeleteUser userId={user._id} />
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="row">
          <div className="col md-12 mt-5 mb-5">
            <hr />
            <p className="profile-about">{user.about}</p>
            <hr />
            <ProfileTabs followers={user.followers} following={user.following} posts={posts} />
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;
