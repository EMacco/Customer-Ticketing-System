import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import FormField from "../common/FormField";
import {loginUser} from "../../actions/auth";

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: ""
        }
    }

    textChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    onSubmit = e => {
        e.preventDefault();
        this.setState({...this.state, isLoading: true});

        const {email, password} = this.state;
        const userData = {email, password};
        this.props.loginUser(userData);
    };

    render() {
        const { email, password } = this.state;
        const {isLoading} = this.props;

        return (
            <form onSubmit={this.onSubmit}>
                <FormField placeholder={"Email"}
                           name={"email"}
                           value={email}
                           type="email"
                           textChange={ this.textChange } />
                <FormField placeholder={"Password"}
                           name={"password"}
                           value={password}
                           type="password"
                           textChange={ this.textChange }/>
                <div className="flex flex-col mt-8">
                    {
                        isLoading ? (
                            <span
                                    className="bg-gray-500 text-center text-white text-sm font-semibold py-2 px-4 rounded disabled">
                                Loading...
                            </span>
                        ) : (
                            <button type="submit"
                                    className="bg-yellow-700 hover:bg-yellow-800 text-white text-sm font-semibold py-2 px-4 rounded">
                                Login
                            </button>
                        )
                    }

                </div>
            </form>
        );
    }
}

Login.propTypes = {
    isLoading: PropTypes.bool.isRequired
};


const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    isLoading: state.auth.loading
});

export default connect(
    mapStateToProps,
    {loginUser}
)(Login);


