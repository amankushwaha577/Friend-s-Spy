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
                <main role="main" class="container" style = {{marginTop:"70px", fontFamily:"Copperplate Gothic Light"}}>
                     <div class="jumbotron">
                        <h1>Admin Dashboard</h1>
                        <p class="lead">Restric Users and Post</p>
                     </div>
                </main>
                <div className="container-fluid">
                    <div className="row" >
                        <div className="col-md-8" style ={{margin:"17%", marginTop:"-70px"}}>
                            {/* <h2>Users</h2> */}
                            {/* <hr /> */}
                            <Users />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-8" style ={{margin:"17%", marginTop:"-10%"}}>
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
