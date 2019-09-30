import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import NavBar from '../common/NavBar';
import Request from "../common/Request";
import {fetchRequests} from "../../actions/requests";
import PreLoader from "../common/PreLoader";

const exportToCsv = (filename, rows) => {
    const processRow = (row) => {
        let finalVal = '';
        for (let j = 0; j < row.length; j++) {
            let innerValue = row[j] === null ? '' : row[j].toString();
            if (row[j] instanceof Date) {
                innerValue = row[j].toLocaleString();
            }
            let result = innerValue.replace(/"/g, '""');
            if (result.search(/("|,|\n)/g) >= 0)
                result = '"' + result + '"';
            if (j > 0)
                finalVal += ',';
            finalVal += result;
        }
        return finalVal + '\n';
    };

    let csvFile = '';
    for (let i = 0; i < rows.length; i++) {
        csvFile += processRow(rows[i]);
    }

    let blob = new Blob([csvFile], { type: 'text/csv;charset=utf-8;' });
    if (navigator.msSaveBlob) {
        navigator.msSaveBlob(blob, filename);
    } else {
        let link = document.createElement("a");
        if (link.download !== undefined) {
            let url = URL.createObjectURL(blob);
            link.setAttribute("href", url);
            link.setAttribute("download", filename);
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    }
};

class Home extends Component {
    constructor(props) {
        super(props);

        const {fetchRequests} = props;
        fetchRequests();
    }

    printReportBtnClicked = () => {
        const csvRow = [['id', 'title', 'description']];
        self.closedRequests.map(req => {
            csvRow.push([req.id, req.title, req.description])
        });
        exportToCsv("cts-report.csv", csvRow);
    };

    render() {
        const {user, requests, isLoading} = this.props;
        const {first_name, last_name, role} = user;

        const openRequests = [];
        const closedRequests = [];
        self.closedRequests = [];

        requests.map(request => {
            if(request.status === 'open') {
                openRequests.push(<Request {...request} key={request.id} />)
            } else {
                closedRequests.push(<Request {...request} key={request.id} />);
                self.closedRequests.push(request);
            }
        });

        return (
            <div>
                <NavBar />
                {
                    isLoading ? (
                        <PreLoader />
                    ) : (
                        <div className="container mx-auto p-4">
                            <div className="flex">
                                <div className="text-gray-700 italic w-full">
                                    Welcome to the Customer Ticketing System (CTS) {first_name} {last_name}
                                </div>
                                {
                                    (role === 'admin' || role === 'agent') && (
                                        <button className="w-32 bg-yellow-700 hover:bg-yellow-800 text-white text-sm font-semibold py-2 px-4 rounded"
                                                onClick={this.printReportBtnClicked}>
                                            Print Report
                                        </button>
                                    )
                                }
                            </div>
                            {
                                requests.length === 0 ? (
                                    <div className="mt-4">
                                        There are no requests to display at the moment
                                        <Link className="text-yellow-700 hover:underline ml-2 spanLink" to="/requests/new">
                                            Create New
                                        </Link>
                                    </div>
                                ) : (
                                    <Fragment>
                                        <div className="container mx-auto py-8">
                                            <span className="text-gray-700 italic">Open Requests ({openRequests.length})</span>
                                            <div className="flex flex-row flex-wrap -mx-2 mt-2">
                                                {openRequests}
                                            </div>
                                        </div>

                                        <div className="container mx-auto py-8">
                                            <span className="text-gray-700 italic">Closed Requests({closedRequests.length})</span>
                                            <div className="flex flex-row flex-wrap -mx-2 mt-2">
                                                {closedRequests}
                                            </div>
                                        </div>
                                    </Fragment>
                                )
                            }
                        </div>
                    )
                }
            </div>
        )
    }
};

Home.propTypes = {
    requests: PropTypes.array.isRequired,
    user: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    requests: state.requests.all,
    user: state.auth.user,
    isLoading: state.requests.loading,
});

export default connect(mapStateToProps, {fetchRequests})(Home);
