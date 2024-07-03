import React, { Component } from "react";
import { list } from "./apiUser";
import DefaultProfile from "../images/avatar.jpg";
import { Link } from "react-router-dom";
import "./Users.css"; // Import the CSS file

class Users extends Component {
    constructor() {
        super();
        this.state = {
            users: []
        };
    }

    componentDidMount() {
        list().then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                this.setState({ users: data });
            }
        });
    }

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
                    </div>
                </div>
            ))}
        </div>
    );

    render() {
        const { users } = this.state;
        return (
            <div className="container users-container">
                <h1 className="users-title">Users</h1>
                {this.renderUsers(users)}
            </div>
        );
    }
}

export default Users;
