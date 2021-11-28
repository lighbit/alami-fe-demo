import React from "react";
import MUIDataTable from "mui-datatables";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import { Row, Col, Button, Alert } from "react-bootstrap";
import Aux from "../hoc/_Aux";
import moment from "moment/moment";
import AuthCustomer from "./auth/auth-user";

class Customer extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            successful: false,
            message: "",
        };
    }

    getMuiTheme = () =>
        createMuiTheme({
            overrides: {
                MUIDataTableBodyCell: {
                    root: {},
                },
            },
        });

    componentDidMount() {

        const data = AuthCustomer.findAll();
        console.log("user response: ", data);
        Promise.resolve(data).then((value) => {
            this.setState({
                data: value,
            });
        });

        const success = this.props.match.params.success;
        console.log("Delete success -> " + success);
        if (success) {
            this.setState({
                message: success,
                successful: true,
            });
        }

    }

    render() {
        var { data } = this.state
        const columns = [
            {
                label: "No",
                name: "id",
                options: {
                    filter: true,
                    sort: false,
                    customBodyRender: (value, tableMeta, update) => {
                        let rowIndex = tableMeta.rowIndex + 1;
                        return <span> {rowIndex} </span>;
                    },
                },
            },
            {
                label: "Created Date",
                name: "created_at",
                options: {
                    filter: true,
                    customBodyRender: (value, tableMeta, updateValue) => {
                        if (value != null) {
                            const date = moment(value).format('MM/DD/YYYY HH:MM:SS');
                            return date;
                        } else {
                            return "-";
                        }
                    },
                },
            },
            {
                label: "Name",
                name: "name",
                options: {
                    filter: true,
                    sort: true,
                },
            },
            {
                label: "Agent Id",
                name: "agentid",
                options: {
                    filter: true,
                    sort: true,
                },
            },
            {
                label: "Born",
                name: "born",
                options: {
                    filter: true,
                    customBodyRender: (value, tableMeta, updateValue) => {
                        if (value != null) {
                            const date = moment(value).format('MM/DD/YYYY');
                            return date;
                        } else {
                            return "-";
                        }
                    },
                },
            },
            {
                label: "Address",
                name: "address",
                options: {
                    filter: true,
                    sort: true,
                },
            },
            {
                label: "Balance",
                name: "balance",
                options: {
                    filter: true,
                    customBodyRender: (value, tableMeta, updateValue) => {
                        return 'Rp. ' + parseInt(value).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
                    },
                },
            },
            {
                label: "Status",
                name: "status",
                options: {
                    filter: true,
                    sort: true,
                },
            },
            {
                label: "Action",
                name: "id",
                options: {
                    filter: false,
                    customBodyRender: (value, tableMeta, update) => {
                        let rowIndex = tableMeta.rowIndex;
                        return (
                            <div>
                                <Button
                                    variant="info"
                                    className="btn btn-info btn-sm"
                                    onClick={() => {
                                        editTask(rowIndex);
                                    }}
                                >
                                    <i className="feather icon-edit" />
                                    &nbsp;Edit
                                </Button>
                            </div>
                        );
                    },
                },
            },
        ];

        const options = {
            filterType: "dropdown",
            responsive: "stacked",

            selectableRows: false,
            downloadOptions: { filename: "Transaction-log.csv", separator: "," },
            customToolbar: () => (<Button
                className="btn btn-primary btn-md"
                onClick={() => {
                    const { history } = this.props;
                    history.push(`/new-customer`);
                }}
            >
                <i className="feather icon-plus" />
                &nbsp;Add Customer
            </Button>),
        };

        const editTask = (rowIndex) => {
            console.log(rowIndex);
            let idData = this.state.data[rowIndex].id;
            console.log(idData);
            const { history } = this.props;
            history.push("/edit-customer/" + idData);
        };

        return (
            <div>
                {this.state.message && (
                    <Alert
                        className={
                            this.state.successful
                                ? "alert alert-success alert-dismissible fade show"
                                : "alert alert-danger alert-dismissible fade show"
                        }
                        role="alert"
                    >
                        {this.state.message}
                    </Alert>
                )}
                <Aux>
                    <Row>
                        <Col>
                            <MuiThemeProvider theme={this.getMuiTheme()}>
                                <MUIDataTable
                                    title={"Customer"}
                                    data={data}
                                    columns={columns}
                                    options={options}
                                />
                            </MuiThemeProvider>
                        </Col>
                    </Row>
                </Aux>
            </div>
        );
    }
}

export default Customer;
