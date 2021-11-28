import React from "react";
import MUIDataTable from "mui-datatables";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import { Row, Col, Card, Alert } from "react-bootstrap";
import Aux from "../hoc/_Aux";
import AuthTransactionUserList from "./auth/auth-transaction-user";

class TransactionUserList extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
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

        const data = AuthTransactionUserList.findAll();
        console.log("Transaction User response: ", data);
        Promise.resolve(data).then((value) => {
            this.setState({
                data: value,
            });
        });

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
            downloadOptions: { filename: "Transaction-MongoDB.csv", separator: "," },
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
                                    title={"Transaction Log Per User"}
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
