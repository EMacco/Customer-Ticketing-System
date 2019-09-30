import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Redirect} from 'react-router-dom';
import {fetchAllUsers} from "../../actions/users";
import NavBar from "../common/NavBar";
import PreLoader from "../common/PreLoader";
import {changeUserRole} from "../../actions/users";

class Users extends Component {
    constructor(props) {
        super(props);

        const {fetchAllUsers} = this.props;
        fetchAllUsers();
    }

    changeUserRole = (e) => {
        const roles = ["admin", "agent", "user"];
        const {changeUserRole} = this.props;
        changeUserRole(`/users/${e.target.id}`, {role: roles[e.target.selectedIndex]});
    };

    userCard = ({id, first_name, last_name, email, phone, role}) => (
        <div className="flex shadow p-2 m-2 rounded px-4" key={id}>
            <div className="flex-grow">{first_name} {last_name}</div>
            <div className="flex-grow">{email}</div>
            <div className="flex-grow">{phone}</div>
            <select defaultValue={role} onChange={this.changeUserRole} id={id}>
                <option value="admin">Admin</option>
                <option value="agent">Agent</option>
                <option value="user">User</option>
            </select>
        </div>
    );

    render() {
        const {isLoading, users, myRole} = this.props;
        if (myRole !== 'admin') return <Redirect to="/" />;
        return(
            <div>
                <NavBar />
                {
                    isLoading ? (
                        <PreLoader />
                    ) : (
                        <div className="container mx-auto">
                            {
                                users.map(user => (
                                   this.userCard(user)
                                ))
                            }
                        </div>
                    )
                }
            </div>
        )
    }
}

Users.propTypes = {
    users: PropTypes.array.isRequired,
    isLoading: PropTypes.bool.isRequired,
    myRole: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
    users: state.users.all,
    isLoading: state.users.loading,
    myRole: state.auth.user.role
});

export default connect(mapStateToProps, {fetchAllUsers, changeUserRole})(Users);
