import React from "react";
import MUIDataTable from "mui-datatables";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import { Row, Col, Card, Alert } from "react-bootstrap";
import Input from "react-input-mask";
import Select from "react-select";
import Datetime from "react-datetime";
import Aux from "../hoc/_Aux";
import moment from "moment/moment";
import AuthTransaction from "./auth/auth-transaction-log";
import AuthCustomer from "./auth/auth-user";

class TransactionSearch extends React.Component {

    constructor(props) {
        super(props);
        this.handleRegister = this.handleRegister.bind(this);
        this.onChangeStartDate = this.onChangeStartDate.bind(this);
        this.onChangeEndDate = this.onChangeEndDate.bind(this);
        this.onChangeAnggota = this.onChangeAnggota.bind(this);
        this.onChangeNominal = this.onChangeNominal.bind(this);
        this.state = {
            data: null,
            successful: false,
            message: "",
            startShift: "",
            endShift: "",
            nominal: "",
            loading: false,
            anggota: [],
            parentAnggota: "",
            anggotaIs: {
                name: "",
            },
            showTable: false,
        };
    }

    onChangeAnggota(e) {
        this.setState({
            anggotaIs: {
                name: {
                    value: e.value,
                    label: e.label,
                },
            },
            parentAnggota: e.value,
        });

    }

    parseAnggota(anggotas) {
        return anggotas.map((anggota) => {
            return { label: anggota.name, value: anggota.id };
        });
    }

    onChangeStartDate(e) {
        let startShift = moment(e).format('YYYY-MM-DD');
        console.log(startShift);
        this.setState({
            startShift: startShift,
        });
    }

    onChangeEndDate(e) {
        let endShift = moment(e).format('YYYY-MM-DD');
        console.log(endShift);
        this.setState({
            endShift: endShift,
        });
    }

    onChangeNominal(e) {
        this.setState({
            nominal: e.target.value,
        });
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

        AuthCustomer.findAll()
            .then((response) => {
                this.setState({
                    anggota: this.parseAnggota(response),
                });
            })
            .catch((e) => {
                console.log(e);
                this.setState({});
            });
    }

    handleRegister(e) {
        e.preventDefault();

        this.setState({
            message: "",
            successful: false,
            loading: true,
        });

        this.form.validateAll();

        if (this.checkBtn.context._errors.length === 0) {
            AuthTransaction.findByParam(
                this.state.startShift,
                this.state.endShift,
                this.state.parentAnggota,
                this.state.nominal,
            ).then(
                (response) => {
                    console.log("response", response);
                    if (response.length === 0) {
                        this.setState({
                            message: "Sorry Data Not Available",
                            successful: false,
                            results: response,
                            loading: false,
                        });
                    } else {
                        this.setState({
                            message: "Data Loaded ",
                            successful: true,
                            results: response,
                            loading: false,
                            hide: false,
                        });
                    }
                },
                (error) => {
                    const resMessage =
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString();

                    this.setState({
                        successful: false,
                        message: resMessage,
                        loading: false,
                    });
                }
            );
        }
    }

    render() {
        var { showTable, data } = this.state
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
            downloadOptions: { filename: "Transaction-log.csv", separator: "," },
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
                            <Card>
                                <Card.Header>
                                    <Card.Title as="h5">Transaction Search</Card.Title>
                                </Card.Header>
                                <Card.Body>
                                    <Row>
                                        <Col>
                                            <label htmlFor="anggota">Anggota</label>
                                            <Select
                                                name="line"
                                                className="basic-single"
                                                classNamePrefix="select"
                                                options={this.state.anggota}
                                                onChange={this.onChangeAnggota}
                                                placeholder="Choose Anggota"
                                                required
                                            />
                                        </Col>
                                        <Col>
                                            <label htmlFor="start">Date Start</label>
                                            <Datetime
                                                name="start"
                                                timeFormat={false}
                                                value={this.state.startShift}
                                                onChange={this.onChangeStartDate}
                                                inputProps={{ placeholder: "Select Transaksi Start" }}
                                            />
                                        </Col>
                                        <Col>
                                            <label htmlFor="end">Date End</label>
                                            <Datetime
                                                name="end"
                                                timeFormat={false}
                                                value={this.state.endShift}
                                                onChange={this.onChangeEndDate}
                                                inputProps={{ placeholder: "Select Transaksi End" }}
                                            />
                                        </Col>
                                        <Col>
                                            <label htmlFor="nominal">Nominal</label>
                                            <Input
                                                type="text"
                                                className="form-control"
                                                name="nominal"
                                                value={this.state.nominal}
                                                onChange={this.onChangeNominal}
                                                placeholder="Input Nominal here. ."
                                            />
                                        </Col>
                                        <Col sm="2" style={{ paddingTop: 10 }}>
                                            <button
                                                className="btn btn-primary btn-block"
                                                onClick={(e) => this.handleRegister(e)}
                                                style={{
                                                    height: "100%",
                                                    width: "50%",
                                                    display: "block",
                                                    borderRadius: 5,
                                                }}
                                            >
                                                {this.state.loading ? (
                                                    <span className="spinner-border spinner-border-sm"></span>
                                                ) : (
                                                    <span>Search</span>
                                                )}
                                            </button>
                                        </Col>
                                    </Row>
                                </Card.Body>
                            </Card>

                            {showTable &&
                                <Card>
                                    <Card.Header>
                                        <Card.Title as="h5">Result</Card.Title>
                                    </Card.Header>
                                    <Card.Body>
                                        <MuiThemeProvider theme={this.getMuiTheme()}>
                                            <MUIDataTable
                                                title={"Transaction Log"}
                                                data={data}
                                                columns={columns}
                                                options={options}
                                            />
                                        </MuiThemeProvider>
                                    </Card.Body>
                                </Card>
                            }
                        </Col>
                    </Row>
                </Aux>
            </div>
        );
    }
}

export default TransactionSearch;
