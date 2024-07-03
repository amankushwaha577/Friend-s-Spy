import React, { Component } from "react";
import { Link } from "react-router-dom";
import DefaultProfile from "../images/avatar.jpg";

class ProfileTabs extends Component {
    render() {
        const { following, followers, posts } = this.props;
        return (
            <div>
                <div className="row">
                    <div className="col-md-4" >
                        <h2 className="text-white font-weight-bold" style = {{fontFamily:"Bahnschrift SemiBold"}}>
                            {followers.length} Followers
                        </h2>
                        <hr style={{ color: "red", backgroundColor: "red",height: 5 }}/>
                        {followers.map((person, i) => (
                            <div key={i}>
                                <div>
                                    <Link to={`/user/${person._id}`}>
                                        <img
                                            style={{
                                                borderRadius: "50%",
                                                border: "1px solid black"
                                            }}
                                            className="float-left mr-2"
                                            height="30px"
                                            width="30px"
                                            onError={i =>
                                                (i.target.src = `${DefaultProfile}`)
                                            }
                                            src={`${
                                                process.env.REACT_APP_API_URL
                                            }/user/photo/${person._id}`}
                                            alt={person.name}
                                        />
                                        <div>
                                            <h4 className="text-white">
                                                {person.name}
                                            </h4>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="col-md-4">
                        <h2 className="text-white font-weight-bold" style = {{fontFamily:"Bahnschrift SemiBold"}}>
                            {following.length} Following
                        </h2>
                        <hr style={{ color: "red", backgroundColor: "red",height: 5 }}/>
                        {following.map((person, i) => (
                            <div key={i}>
                                <div>
                                    <Link to={`/user/${person._id}`}>
                                        <img
                                            style={{
                                                borderRadius: "50%",
                                                border: "1px solid black"
                                            }}
                                            className="float-left mr-2"
                                            height="30px"
                                            width="30px"
                                            onError={i =>
                                                (i.target.src = `${DefaultProfile}`)
                                            }
                                            src={`${
                                                process.env.REACT_APP_API_URL
                                            }/user/photo/${person._id}`}
                                            alt={person.name}
                                        />
                                        <div>
                                            <h4 className="text-white">
                                                {person.name}
                                            </h4>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="col-md-4">
                        <h2 className="text-white font-weight-bold" style = {{fontFamily:"Bahnschrift SemiBold"}}>{posts.length} Posts</h2>
                        <hr style={{ color: "red", backgroundColor: "red",height: 5 }}/>
                        {posts.map((post, i) => (
                            <div key={i}>
                                <h3 className="alert alert-primary font-weight-bold" role="alert" style = {{fontFamily:"Lucida Console"}}>
                                    <Link to={`/post/${post._id}`}>
                                        <div>
                                            <p>{post.title}</p>
                                        </div>
                                    </Link>
                                </h3>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }
}

export default ProfileTabs;
