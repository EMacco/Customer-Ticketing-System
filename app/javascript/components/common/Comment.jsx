import React from 'react';
import PropTypes from 'prop-types';
import classname from 'classnames';
import {connect} from 'react-redux';
import formatDate from "../../helpers/formatDate";

const Comment = ({text, user_id, user, created_at}) => {
    return(
        <div>
            <div className={classname("p-4 rounded b", {
                "text-right": user_id === user.id
            })}>
                {text}
                <div className="text-gray-600 italics text-sm">{formatDate(created_at).short}</div>
            </div>

            <hr />
        </div>
    )
};

Comment.propTypes = {
    text: PropTypes.string.isRequired,
    created_at: PropTypes.string.isRequired,
    user: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    user: state.auth.user
});

export default connect(mapStateToProps, {})(Comment);
