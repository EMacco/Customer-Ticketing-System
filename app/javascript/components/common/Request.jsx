import React, {Component} from 'react';
import classname from 'classnames';
import PropTypes from 'prop-types';
import Ellipsis from 'react-ellipsis-pjs';
import {connect} from 'react-redux';
import {Link, withRouter} from "react-router-dom";
import formatDate from "../../helpers/formatDate";
import {closeRequest} from "../../actions/requests";

class Request extends Component {
    constructor(props) {
        super(props)

    }

    closeRequestBtnClicked = () => {
        const {closeRequest, location: {pathname}} = this.props;
        closeRequest(pathname);
    };

    content = () => {
        const {title, description, created_at, full, status, first_name, last_name} = this.props;

        return(
            <div className="p-4">
                <h3 className="text-lg font-bold">
                    <span className="">{title}</span>
                </h3>
                <span>{first_name} {last_name}</span>
                <time className="block mb-2 text-sm text-gray-600" dateTime={created_at}>{formatDate(created_at).short}</time>
                {
                    full ? (
                        <p>{description}</p>
                    ) : (

                        <Ellipsis lines={2}>
                            {description}
                        </Ellipsis>
                    )
                }
                {
                    full && (
                        status === 'open'  ? (
                            <button className="bg-red-700 text-white hover:bg-red-800 rounded px-4 mt-3" onClick={this.closeRequestBtnClicked}>Close</button>
                        ) : (
                            <span className="text-red-500 italic">Closed</span>
                        )
                    )
                }
            </div>
        )
    };

    render() {
        const {id, title, description, status, created_at, full} = this.props;

        return(
            <div className={classname("w-full", {
                "sm:w-1/2 md:w-1/3 mb-4 px-2": !full,

            })}>
                <div className={classname("relative bg-white rounded border shadow", {
                    "hover:border-green-400": status === 'open' && !full,
                    "hover:border-red-400": status === 'closed' && !full,
                })}>
                    {
                        full ? (
                            <div>
                                {this.content()}
                            </div>
                        ) : (
                            <Link to={`/requests/${id}`}>
                                {this.content()}
                            </Link>
                        )
                    }
                </div>
            </div>
        )
    }
};

Request.propTypes = {
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    created_at: PropTypes.string,
    full: PropTypes.bool,
    first_name: PropTypes.string,
    last_name: PropTypes.string
};

Request.defaultProps = {
    full: false,
    first_name: '',
    last_name: ''
};

const mapStateToProps = state => ({
    ...state.requests.single
});

export default connect(mapStateToProps, {closeRequest})(withRouter(Request));
