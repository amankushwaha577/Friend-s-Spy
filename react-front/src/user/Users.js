import React, { Component } from "react";
import { list } from "./apiUser";
import DefaultProfile from "../images/avatar.jpg";
import { Link } from "react-router-dom";

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
        <div className="row">
            {users.map((user, i) => (
                // <div className="card col-md-4" key={i}>
                <div className="card mb-3" key={i} style={{flex: "0 0 33.33333%", maxWidth: "30%", marginRight: "3.33%"}}>
                    <img
                        style={{ height: "300px", width: "auto" }}
                        className="img-thumbnail"
                        src={`${process.env.REACT_APP_API_URL}/user/photo/${
                            user._id
                        }`}
                        onError={i => (i.target.src = `${DefaultProfile}`)}
                        alt={user.name}
                    />
                    <div className="card-body">
                        <h5 className="card-title" style={{fontFamily:"Bahnschrift SemiBold"}}>{user.name}</h5>
                        <p className="card-text" style={{fontFamily:"Segoe Print"}}>{user.email}</p>
                        <Link
                            to={`/user/${user._id}`}
                            className="btn btn-raised btn-primary btn-sm"
                            style={{fontFamily:"Century Gothic"}}
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
            <div className="container" style = {{marginTop:"100px", fontFamily:"Copperplate Gothic Light"}}>
                <h1 className="mt-5 mb-5 text-white font-weight-bold">Users</h1>

                {this.renderUsers(users)}
            </div>
        );
    }
}

export default Users;
