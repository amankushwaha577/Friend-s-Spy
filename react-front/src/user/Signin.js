import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { signin, authenticate } from "../auth";
import SocialLogin from "./SocialLogin";

class Signin extends Component {
    constructor() {
        super();
        this.state = {
            email: "",
            password: "",
            error: "",
            redirectToReferer: false,
            loading: false,
            recaptcha: false
        };
    }

    handleChange = name => event => {
        this.setState({ error: "" });
        this.setState({ [name]: event.target.value });
    };