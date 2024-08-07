import React, { Component } from "react";
import { list } from "./apiPost";
import DefaultPost from "../images/mountains.jpg";
import { Link } from "react-router-dom";

class Posts extends Component {
  constructor() {
    super();
    this.state = {
      posts: [],
      page: 1
    };
  }

  loadPosts = page => {
    list(page).then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        console.log(data);
        this.setState({ posts: data });
      }
    });
  };

  componentDidMount() {
    this.loadPosts(this.state.page);
  }

  loadMore = number => {
    this.setState({ page: this.state.page + number });
    this.loadPosts(this.state.page + number);
  };

  loadLess = number => {
    this.setState({ page: this.state.page - number });
    this.loadPosts(this.state.page - number);
  };

  renderPosts = posts => {
    return (
      <div className="row">
        {posts.map((post, i) => {
          const posterId = post.postedBy ? `/user/${post.postedBy._id}` : "";
          const posterName = post.postedBy ? post.postedBy.name : " Unknown";

          if (!post.photo) {
            return;
          }

          return (
            // <div className="card col-md-4" key={i}>
            <div className="card mb-3" key={i} style={{flex: "0 0 33.33333%", maxWidth: "30%", marginRight: "3.33%"}}>
              <div className="card-body">
                <img
                  src={`${process.env.REACT_APP_API_URL}/post/photo/${post._id}`}
                  alt={post.title}
                  onError={i => (i.target.src = `${DefaultPost}`)}
                  className="img-thunbnail mb-3"
                  style={{ height: "200px", width: "100%" }}
                />
                <h5 className="card-title" style={{fontFamily:"Bahnschrift SemiBold"}}>{post.title}</h5>
                <p className="card-text" style={{fontFamily:"Segoe Print"}}>{post.body.substring(0, 100)}</p>
                <br />
                <p className="font-italic mark" style={{fontFamily:"Century Gothic"}}>
                  Posted by <Link to={`${posterId}`}>{posterName} </Link>
                  on {new Date(post.created).toDateString()}
                </p>
                <Link
                  to={`/post/${post._id}`}
                  className="btn btn-raised btn-primary btn-sm"
                  style={{fontFamily:"Segoe UI"}}
                >
                  Read more
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  render() {
    const { posts, page } = this.state;
    return (
      <div className="container">
        <h2 className="mt-5 mb-3 text-white font-weight-bold" style={{fontFamily:"Bahnschrift SemiBold"}}>
          {!posts.length ? "No more posts!" : "LATEST POSTS"}
        </h2>

        {this.renderPosts(posts)}

        {page > 1 ? (
          <button
            className="btn btn-raised btn-warning mr-5 mt-5 mb-5"
            style={{fontFamily:"Trebuchet MS"}}

            onClick={() => this.loadLess(1)}
          >
            Previous ({this.state.page - 1})
          </button>
        ) : (
          ""
        )}

        {posts.length ? (
          <button
            className="btn btn-raised mt-5 mb-5" style ={{backgroundColor: "red", color:"white",fontFamily:"Trebuchet MS"}}
            onClick={() => this.loadMore(1)}
          >
            Next ({page + 1})
          </button>
        ) : (
          ""
        )}
      </div>
    );
  }
}

export default Posts;
