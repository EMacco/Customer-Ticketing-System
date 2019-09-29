import React from 'react';
import classname from 'classnames';
import PropTypes from 'prop-types';
import {Link} from "react-router-dom";
import formatDate from "../../helpers/formatDate";

const Request = ({id, title, description, status, created_at}) => {
    return(
        <div className="w-full sm:w-1/2 md:w-1/3 mb-4 px-2">
            <div className={classname("relative bg-white rounded border spanLink shadow", {
                "hover:border-green-400": status === 'open',
                "hover:border-red-400": status === 'closed'
            })}>
                <Link to={`/requests/${id}`}>
                    <div className="p-4">
                        <h3 className="text-lg font-bold">
                            <span className="">{title}</span>
                        </h3>
                        <time className="block mb-2 text-sm text-gray-600" dateTime={created_at}>{formatDate(created_at).short}</time>
                        <p>
                            {description}
                        </p>
                    </div>
                </Link>
            </div>
        </div>
    )
};

Request.propTypes = {
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    created_at: PropTypes.string
};

export default Request;
