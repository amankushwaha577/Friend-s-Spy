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
    <div className="col-md-4 mb-4" key={i}>
      <div className="card h-100">
        <img
          src={`${process.env.REACT_APP_API_URL}/user/photo/${user._id}`}
          onError={(i) => (i.target.src = `${DefaultProfile}`)}
          alt={user.name}
          className="card-img-top"
          style={{ height: "300px", objectFit: "cover" }}
        />
        <div className="card-body">
          <h5 className="card-title font-weight-bold" style={{ fontFamily: "Bahnschrift SemiBold" }}>
            {user.name}
          </h5>
          <p className="card-text" style={{ fontFamily: "Segoe Print" }}>
            {user.email}
          </p>
        </div>
        <div className="card-footer">
          <Link
            to={`/user/${user._id}`}
            className="btn btn-primary btn-sm"
            style={{ fontFamily: "Century Gothic" }}
          >
            View Profile
          </Link>
        </div>
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
