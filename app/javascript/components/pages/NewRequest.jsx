import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import NavBar from "../common/NavBar";
import Button from "../common/Button";
import {createRequest} from "../../actions/requests";

class NewRequest extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    createBtnClicked = e => {
        e.preventDefault();
        const {createRequest, history} = this.props;
        const {title, description} = this.state;
        createRequest({title, description}, history);
    };

    textChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    render() {
        const {isLoading} = this.props;
        return(
            <div>
                <NavBar />
                <div className="flex flex-col items-center flex-1 h-full px-4 sm:px-0">
                    <div className=" mt-4 flex rounded-lg shadow-xl w-full sm:w-3/4 lg:w-1/2 bg-white sm:mx-0 height_400">
                        <div className="flex flex-col flex-1 mb-8 p-4">
                            <div className="text-center w-full font-medium text-gray-700 mb-4">Create new Request</div>
                            <form onSubmit={this.createBtnClicked}>
                                <input className="w-full px-5 py-3 text-gray-700 bg-gray-200 rounded"
                                       name="title" type="text" placeholder="Enter Title"
                                       aria-label="Title" maxLength="30" required onChange={this.textChange} />
                                <textarea className="height_215 w-full px-5 py-3 my-3 text-gray-700 bg-gray-200 rounded"
                                        placeholder="How can we be of service?" name="description" maxLength="500" onChange={this.textChange} required />

                                {
                                    isLoading ? <Button text="Saving..." enabled={false} /> : <Button text="Submit" />
                                }

                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

NewRequest.propTypes = {
    createRequest: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
    isLoading: state.requests.loading
});

export default connect(mapStateToProps, {createRequest})(withRouter(NewRequest));
