import React from "react";
import MUIDataTable from "mui-datatables";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import { Row, Col, Button, Alert } from "react-bootstrap";
import Aux from "../hoc/_Aux";
import moment from "moment/moment";
import AuthTransaction from "./auth/auth-transaction-log";

class TransactionUserList extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            successful: false,
            message: "",
            money: "0",
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

        const data = AuthTransaction.findAll();
        console.log("transaction-log response: ", data);
        Promise.resolve(data).then((value) => {
            this.setState({
                data: value,
                showTable: true,
            });
        });

        const money = AuthTransaction.getMoney();
        console.log("Money response: ", money);
        Promise.resolve(money).then((value) => {
            this.setState({
                money: value,
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
        var { data, money } = this.state
        var balance = "0"
        var last_calibrate = moment(new Date()).format('MM/DD/YYYY HH:MM:SS')
        if (money != undefined && money.length > 0) {
            balance = 'Rp. ' + parseInt(money[0].amount).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
            last_calibrate = moment(money[0].last_calibrate).format('MM/DD/YYYY HH:MM:SS');
        }
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
                label: "Username",
                name: "user",
                options: {
                    filter: true,
                    customBodyRender: (value, tableMeta, updateValue) => {
                        return value.name;
                    },
                },
            },
            {
                label: "Agent Id",
                name: "user",
                options: {
                    filter: true,
                    customBodyRender: (value, tableMeta, updateValue) => {
                        return value.agentid;
                    },
                },
            },
            {
                label: "Amount",
                name: "amount",
                options: {
                    filter: true,
                    customBodyRender: (value, tableMeta, updateValue) => {
                        return 'Rp. ' + value.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
                    },
                },
            },
            {
                label: "Type",
                name: "type",
                options: {
                    filter: true,
                    sort: true,
                },
            },
        ];

        const options = {
            filterType: "dropdown",
            responsive: "stacked",

            selectableRows: false,
            downloadOptions: { filename: "Transaction-PostgreSQL.csv", separator: "," },
            customToolbar: () => (<Button
                className="btn btn-primary btn-md"
                onClick={() => {
                    const { history } = this.props;
                    history.push(`/new-transaction`);
                }}
            >
                <i className="feather icon-plus" />
                &nbsp;Add Transaction
            </Button>),
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
                                    title={`Balance Koprasi Today ${balance} - (${last_calibrate})`}
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

export default TransactionUserList;
