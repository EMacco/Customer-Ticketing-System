import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {toast} from 'react-toastify';
import FormField from "../common/FormField";
import {register} from "../../actions/auth";

class Registration extends Component {
    constructor(props) {
        super(props);

        this.state = {
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            password: ""
        }
    }

    textChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    onSubmit = e => {
        e.preventDefault();

        const {firstName: first_name,
            lastName: last_name,
            email,
            phone,
            password} = this.state;

        if(first_name.trim().length < 2 || last_name.trim().length < 2) {
            toast.error('First name and Last name should have at least 2 characters');
            return;
        } else if(!/^[0][1-9]\d{9}$|^[1-9]\d{9}$/.test(phone.trim())) {
            toast.error('Phone number should be 11 digits');
            return;
        } else if (password.trim().length < 6) {
            toast.error('Password should be at least 6 characters')
            return;
        }
        this.setState({...this.state, isLoading: true});

        const userData = {first_name, last_name, email, phone, password};
        this.props.register(userData);
    };

    render() {
        const { firstName, lastName, email, password, phone } = this.state;
        const {isLoading} = this.props;

        return (
            <form onSubmit={this.onSubmit}>
                <FormField placeholder={"First Name"}
                           name={"firstName"}
                           value={firstName}
                           textChange={ this.textChange } />
                <FormField placeholder={"Last Name"}
                           name={"lastName"}
                           value={lastName}
                           textChange={ this.textChange }/>
                <FormField placeholder={"Email"}
                           name={"email"}
                           value={email}
                           type="email"
                           textChange={ this.textChange }/>
                <FormField placeholder={"Phone Number"}
                           name={"phone"}
                           value={phone}
                           type="tel"
                           textChange={ this.textChange }/>
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
                                Register
                            </button>
                        )
                    }

                </div>
            </form>
        );
    }
}

Registration.propTypes = {
    isLoading: PropTypes.bool.isRequired
};


const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    isLoading: state.auth.loading
});

export default connect(
    mapStateToProps,
    {register}
)(Registration);
