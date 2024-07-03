import React, { Component } from "react";
import { findPeople, follow } from "./apiUser";
import DefaultProfile from "../images/avatar.jpg";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth";
import "./FindPeople.css"; // Import the CSS file

class FindPeople extends Component {
    constructor() {
        super();
        this.state = {
            users: [],
            error: "",
            open: false
        };
    }

    componentDidMount() {
        const userId = isAuthenticated().user._id;
        const token = isAuthenticated().token;

        findPeople(userId, token).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                this.setState({ users: data });
            }
        });
    }

    clickFollow = (user, i) => {
        const userId = isAuthenticated().user._id;
        const token = isAuthenticated().token;

        follow(userId, token, user._id).then(data => {
            if (data.error) {
                this.setState({ error: data.error });
            } else {
                let toFollow = this.state.users;
                toFollow.splice(i, 1);
                this.setState({
                    users: toFollow,
                    open: true,
                    followMessage: `Following ${user.name}`
                });
            }
        });
    };

    renderUsers = users => (
        <div className="user-grid">
            {users.map((user, i) => (
                <div className="user-card" key={i}>
                    <img
                        className="user-img"
                        src={`${process.env.REACT_APP_API_URL}/user/photo/${user._id}`}
                        onError={i => (i.target.src = `${DefaultProfile}`)}
                        alt={user.name}
                    />
                    <div className="user-card-body">
                        <h5 className="user-card-title">{user.name}</h5>
                        <p className="user-card-text">{user.email}</p>
                        <Link
                            to={`/user/${user._id}`}
                            className="btn btn-primary"
                        >
                            View Profile
                        </Link>
                        <button
                            onClick={() => this.clickFollow(user, i)}
                            className="btn btn-follow"
                        >
                            Follow
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );

    render() {
        const { users, open, followMessage } = this.state;
        return (
            <div className="container find-people-container">
                <h1 className="find-people-title">Find People</h1>
                {open && (
                    <div className="alert alert-success">{followMessage}</div>
                )}
                {this.renderUsers(users)}
            </div>
        );
    }
}

export default FindPeople;
