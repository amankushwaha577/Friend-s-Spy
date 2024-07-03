import React, { Component } from "react";
import { list } from "./apiPost";
import DefaultPost from "../images/mountains.jpg";
import { Link } from "react-router-dom";
import "./Post.css"; // Import the CSS file

class Posts extends Component {
  constructor() {
    super();
    this.state = {
      posts: [],
      page: 1
    };
  }

  loadPosts = (page) => {
    list(page).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        this.setState({ posts: data });
      }
    });
  };

  componentDidMount() {
    this.loadPosts(this.state.page);
  }

  loadMore = (number) => {
    const nextPage = this.state.page + number;
    this.setState({ page: nextPage });
    this.loadPosts(nextPage);
  };

  loadLess = (number) => {
    const prevPage = this.state.page - number;
    this.setState({ page: prevPage });
    this.loadPosts(prevPage);
  };

  renderPosts = (posts) => {
    return (
      <div className="row">
        {posts.map((post, i) => {
          const posterId = post.postedBy ? `/user/${post.postedBy._id}` : "";
          const posterName = post.postedBy ? post.postedBy.name : " Unknown";

          if (!post.photo) {
            return null; // Handle cases where photo is not available
          }

          return (
            <div className="card mb-3 post-card" key={i}>
              <img
                src={`${process.env.REACT_APP_API_URL}/post/photo/${post._id}`}
                alt={post.title}
                onError={(i) => (i.target.src = `${DefaultPost}`)}
                className="card-img-top post-img"
              />
              <div className="card-body post-body">
                <h5 className="card-title post-title">{post.title}</h5>
                <p className="card-text post-text">{post.body.substring(0, 100)}</p>
                <p className="font-italic mark post-info">
                  Posted by{" "}
                  <Link to={`${posterId}`} className="post-link">
                    {posterName}
                  </Link>{" "}
                  on {new Date(post.created).toDateString()}
                </p>
                <Link
                  to={`/post/${post._id}`}
                  className="btn btn-primary btn-sm post-button"
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
      <div className="container post-container">
        <h2 className="post-heading">
          {!posts.length ? "No more posts!" : "LATEST POSTS"}
        </h2>

        {this.renderPosts(posts)}

        {page > 1 && (
          <button
            className="btn btn-warning post-pagination"
            onClick={() => this.loadLess(1)}
          >
            Previous ({page - 1})
          </button>
        )}

        {posts.length > 0 && (
          <button
            className="btn btn-danger post-pagination"
            onClick={() => this.loadMore(1)}
          >
            Next ({page + 1})
          </button>
        )}
      </div>
    );
  }
}

export default Posts;
