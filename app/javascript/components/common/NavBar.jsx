import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Link, Redirect} from 'react-router-dom';
import classname from 'classnames'
import {connect} from 'react-redux';
import {logoutUser} from '../../actions/auth';

class NavBar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            prevScrollpos: window.pageYOffset,
            visible: true
        };
    }

    componentDidMount() {
        window.addEventListener("scroll", this.handleScroll);
    }

    componentWillUnmount() {
        window.removeEventListener("scroll", this.handleScroll);
    }

    handleScroll = () => {
        const { prevScrollpos } = this.state;

        const currentScrollPos = window.pageYOffset;
        const isVisible = prevScrollpos > currentScrollPos;

        this.setState({
            prevScrollpos: currentScrollPos,
            visible: isVisible
        });

    };

    logoutBtnClicked = () => {
        const {logoutUser} = this.props;
        logoutUser()
    };

    render() {
        const {isAuthenticated, role} = this.props;
        if (!isAuthenticated) return <Redirect to="/auth"/>;

        const {visible} = this.state;

        return(
            <div
                className={classname('bg-white shadow sticky z-20', {
                    'notVisible': !visible
                })}
            >
                <nav className="flex items-center justify-between flex-wrap bg-teal p-6 bg-yellow-700 shadow">
                    <Link className="flex items-center flex-no-shrink text-white mr-6" to="/">
                        <img src="https://icon-library.net/images/customer-service-icon/customer-service-icon-24.jpg"
                             alt="Home icon"
                             className="home_icon w-10 h-10" />
                        <span className="font-semibold text-xl tracking-tight">CTS</span>
                    </Link>
                    <div className="flex items-center w-auto">
                        <div>
                            <Link className="mr-4 text-white spanLink hover:text-gray-200" to="/requests/new">New Request</Link>
                            {
                                role === 'admin' && (
                                    <Link className="mr-4 text-white spanLink hover:text-gray-200" to="/users">Users</Link>
                                )
                            }
                        <span onClick={this.logoutBtnClicked}
                              className="spanLink inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal hover:bg-white hover:text-yellow-700 mt-0">Logout</span>
                        </div>
                    </div>
                </nav>
            </div>
        )
    }
};

NavBar.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    role: PropTypes.string
};

NavBar.defaultProps = {
    role: ''
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    role: state.auth.user.role
});

export default connect(mapStateToProps, {logoutUser})(NavBar);
