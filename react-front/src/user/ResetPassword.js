import React, { Component } from "react";
import { resetPassword } from "../auth";

class ResetPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newPassword: "",
            message: "",
            error: ""
        };
    }

    resetPassword = e => {
        e.preventDefault();
        this.setState({ message: "", error: "" });

        resetPassword({
            newPassword: this.state.newPassword,
            resetPasswordLink: this.props.match.params.resetPasswordToken
        }).then(data => {
            if (data.error) {
                console.log(data.error);
                this.setState({ error: data.error, newPassword: "" });
            } else {
                console.log(data.message);
                this.setState({ message: data.message, newPassword: "" });
            }
        });
    };