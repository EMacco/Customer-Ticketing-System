import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import classname from 'classnames';
import {fetchSingleRequest} from "../../actions/requests";
import PreLoader from "../common/PreLoader";
import NavBar from "../common/NavBar";
import Request from "../common/Request";
import Button from "../common/Button";
import Comment from "../common/Comment";
import {createComment} from "../../actions/comments";

class FullRequest extends Component {
    constructor(props) {
        super(props);

        const {fetchSingleRequest, location: {pathname}, history} = props;
        fetchSingleRequest(pathname, history);

        this.state = {comment: ''};
    }

    textChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    postCommentBtnClicked = e => {
        e.preventDefault();
        const {createComment, fullRequest} = this.props;
        const {comment} = this.state;

        createComment(`comments/${fullRequest.request.id}`, {text: comment})
        this.setState({comment: ''})
    };

    render() {
        const {isLoading, fullRequest: {request, comments: fetchedComments, user}, role} = this.props;
        const {comment} = this.state;

        let comments = fetchedComments;
        if(!comments) comments = [];

        return(
            <div>
                <NavBar />
                {
                    isLoading ? (
                        <PreLoader />
                    ) : (
                        <div className="container mx-auto p-4 px-8">
                            {
                                request && (
                                    <Fragment>
                                        <Request {...request} full first_name={user ? user.first_name : ''}
                                        last_name={user ? user.last_name : ''}/>
                                        <hr className="border-gray-300 mt-8 mb-4" />
                                        <span className={classname("text-gray-700 italic",{
                                            "hidden": (comments.length === 0 && role === 'user') || request.status === 'closed'
                                        })}>Comments</span>
                                        {
                                            comments.map(com => <Comment {...com} key={com.id} />)
                                        }
                                        <form className={classname("rounded border-gray-100 shadow px-4 pb-4 border flex",
                                            {
                                                "hidden": (comments.length === 0 && role === 'user') || request.status === 'closed'
                                            })}
                                              onSubmit={this.postCommentBtnClicked}>
                                            <input type="text" maxLength="300"
                                                   className="flex-grow mt-4 h-8 px-2 border rounded border-grey-400"
                                                   placeholder="Write something"
                                                   name="comment"
                                                   onChange={this.textChange}
                                                   value={comment}/>
                                            <Button text="Post" style="bg-yellow-700 text-white hover:bg-red-800 rounded px-4 mt-4 ml-4" />
                                        </form>
                                    </Fragment>
                                )
                            }
                        </div>
                    )
                }
            </div>
        )
    }
}

FullRequest.propTypes = {
    fullRequest: PropTypes.object.isRequired,
    isLoading: PropTypes.bool.isRequired,
    role: PropTypes.string,
    createComment: PropTypes.func.isRequired
};

FullRequest.defaultProps = {
    role: ''
};

const mapStateToProps = state => ({
    fullRequest: state.requests.single,
    isLoading: state.requests.loading,
    role: state.auth.user.role
});

export default connect(mapStateToProps, {fetchSingleRequest, createComment})(withRouter(FullRequest));
