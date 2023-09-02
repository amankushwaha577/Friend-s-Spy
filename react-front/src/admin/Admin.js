import React, { Component } from "react";
import Posts from "../post/Posts";
import Users from "../user/Users";
import { isAuthenticated } from "../auth";
import { Redirect } from "react-router-dom";

class Admin extends Component {
    state = {
        redirectToHome: false
    };

    componentDidMount() {
        if (isAuthenticated().user.role !== "admin") {
            this.setState({ redirectToHome: true });
        }
    }

    render() {
        if (this.state.redirectToHome) {
            return <Redirect to="/" />;
        }

        return (
            <div>
                <div className="jumbotron" style = {{marginTop:"70px", fontFamily:"Copperplate Gothic Light"}}>
                    <h2>Admin Dashboard</h2>
                    <p className="lead">Restric Users and Post</p>
                </div>
                <div className="container-fluid">
                    <div className="row" >
                        <div className="col-md-8" style ={{margin:"10%", marginTop:"0%"}}>
                            {/* <h2>Users</h2> */}
                            {/* <hr /> */}
                            <Users />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-8" style ={{margin:"10%", marginTop:"0%"}}>
                            {/* <h2>Posts</h2> */}
                            <Posts/>
                        </div>
                    </div>
                    
                </div>
            </div>
        );
    }
}

export default Admin;
