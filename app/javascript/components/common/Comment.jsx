import React from 'react';
import PropTypes from 'prop-types';

const Comment = () => {
    return(
        <div>This is a comment</div>
    )
};

Comment.propTypes = {
    text: PropTypes.string.isRequired,
    created_at: PropTypes.string.isRequired
};

export default Comment;
