import React, { Component } from "react";
import { Row, Col, Card, Alert } from "react-bootstrap";
import Datetime from "react-datetime";
import Aux from "../hoc/_Aux";
import Select from "react-select";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import AuthTransaction from "./auth/auth-transaction-log";
import AuthCustomer from "./auth/auth-user";

const required = (value) => {
    if (!value) {
        return (
            <div className="alert alert-danger" role="alert">
                This field is required!
            </div>
        );
    }
};

class Transaction extends Component {
    constructor(props) {
        super(props);
        this.handleRegister = this.handleRegister.bind(this);
        this.onChangeAnggota = this.onChangeAnggota.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onChangeAmount = this.onChangeAmount.bind(this);
        this.onChangeType = this.onChangeType.bind(this);

        this.state = {
            id: null,
            agentid: "",
            date: "",
            dateShow: "",
            amount: "",
            type: [
                { "label": "INCOMING", "value": "INCOMING" },
                { "label": "OUTGOING", "value": "OUTGOING" }
            ],
            parentType: "",
            isEdit: false,
            successful: false,
            message: "",
            anggota: [],
            anggotaIs: {
                name: "",
            },
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
            agentid: e.value,
        });

    }

    parseAnggota(agentids) {
        return agentids.map((agentid) => {
            return { label: agentid.name, value: agentid.agentid };
        });
    }

    onChangeDate(e) {
        const { isEdit } = this.state;
        if (isEdit) {
            this.setState({
                date: e,
                dateShow: e,
            });
        } else {
            this.setState({
                date: e,
            });
        }
    }

    onChangeAmount(e) {
        this.setState({
            amount: e.target.value,
        });
    }

    onChangeType(e) {
        this.setState({
            parentType: e.value,
        });
    }

    componentDidMount() {

        AuthCustomer.findAll()
            .then((response) => {
                this.setState({
                    anggota: this.parseAnggota(response),
                });
                this.setState({
                    type: this.parseType(response),
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
        });

        this.form.validateAll();

        if (this.checkBtn.context._errors.length === 0) {
            AuthTransaction.hitTransaction(
                this.state.agentid,
                this.state.date,
                this.state.amount,
                this.state.parentType
            ).then(
                (response) => {
                    const { history } = this.props;
                    history.push("/Transaction/" + response.data.message);
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
                    });
                }
            );
        }
    }

    deleteById(id) {
        AuthTransaction.delete(id)
            .then((response) => {
                this.setState({
                    message: response.data.message,
                    successful: true,
                });
                console.log("Transaction edit ->", response);
                const { history } = this.props;
                history.push("/Transaction/" + response.data.message);
            })
            .catch((e) => {
                console.log("Error cause -> ", e);
            });
    }

    render() {
        const { isEdit, id } = this.state;
        return (
            <Aux>
                <Row>
                    <Col>
                        <Card>
                            <Card.Header>
                                {isEdit ? (
                                    <Card.Title as="h5">Update Transaction</Card.Title>
                                ) : (
                                    <Card.Title as="h5">New Transaction</Card.Title>
                                )}
                            </Card.Header>
                            <Card.Body>
                                <Form
                                    onSubmit={this.handleRegister}
                                    ref={(c) => {
                                        this.form = c;
                                    }}
                                >
                                    <div className="col-md-12">
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
                                                <label htmlFor="anggota">Type</label>
                                                <Select
                                                    name="line"
                                                    className="basic-single"
                                                    classNamePrefix="select"
                                                    options={this.state.type}
                                                    onChange={this.onChangeType}
                                                    placeholder="Choose Type"
                                                    required
                                                />
                                            </Col>
                                        </Row>
                                        <br />
                                        <Row>
                                            <Col>
                                                <label htmlFor="born">Date</label>
                                                <Datetime
                                                    name="born"
                                                    timeFormat={true}
                                                    value={this.state.date}
                                                    onChange={this.onChangeDate}
                                                    inputProps={{ placeholder: "Select Date Transaction" }}
                                                />
                                            </Col>
                                            <Col>
                                                <label htmlFor="nominal">Nominal</label>
                                                <Input
                                                    type="text"
                                                    className="form-control"
                                                    name="nominal"
                                                    value={this.state.amount}
                                                    onChange={this.onChangeAmount}
                                                    placeholder="Input Nominal here. ."
                                                />
                                            </Col>
                                        </Row>
                                        <br />
                                        <br />
                                        <div className="form-group">
                                            {isEdit ? (
                                                <Row>
                                                    <Col>
                                                        <button className="btn btn-primary btn-block">
                                                            Update Transaction
                                                        </button>
                                                    </Col>
                                                    <Col>
                                                        <button className="btn btn-danger btn-block" onClick={() => {
                                                            this.deleteById(id);
                                                        }}>
                                                            Delete Transaction
                                                        </button>
                                                    </Col>
                                                </Row>
                                            ) : (
                                                <button className="btn btn-primary btn-block">
                                                    Save New Transaction
                                                </button>
                                            )}
                                        </div>
                                    </div>

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
                                    <CheckButton
                                        style={{ display: "none" }}
                                        ref={(c) => {
                                            this.checkBtn = c;
                                        }}
                                    />
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Aux>
        );
    }
}

export default Transaction;
