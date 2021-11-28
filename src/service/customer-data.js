import React, { Component } from "react";
import { Row, Col, Card, Alert } from "react-bootstrap";
import Datetime from "react-datetime";
import moment from "moment/moment";
import Aux from "../hoc/_Aux";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
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

class Customer extends Component {
    constructor(props) {
        super(props);
        this.handleRegister = this.handleRegister.bind(this);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeBorn = this.onChangeBorn.bind(this);
        this.onChangeAddress = this.onChangeAddress.bind(this);

        this.state = {
            id: null,
            name: "",
            born: "",
            bornShow: "",
            address: "",
            isEdit: false,
            successful: false,
            message: "",
        };
    }

    onChangeName(e) {
        this.setState({
            name: e.target.value,
        });
    }

    onChangeBorn(e) {
        const { isEdit } = this.state;
        if (isEdit) {
            this.setState({
                born: e,
                bornShow: e,
            });
        } else {
            this.setState({
                born: e,
            });
        }
    }

    onChangeAddress(e) {
        this.setState({
            address: e.target.value,
        });
    }

    componentDidMount() {
        const id = this.props.match.params.id;
        console.log("Customer ID -> " + id);
        if (id) {
            this.findById(id);
        }
    }

    findById(id) {
        AuthCustomer.getEditUser(id)
            .then((response) => {
                this.setState({
                    id: response.id,
                    name: response.name,
                    born: response.born,
                    bornShow: moment(response.born).format("MM/DD/YYYY"),
                    address: response.address,
                    isEdit: true,
                });
                console.log("Customer edit ->", response);
            })
            .catch((e) => {
                console.log("Error cause -> ", e);
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
            AuthCustomer.registeruser(
                this.state.id,
                this.state.name,
                this.state.born,
                this.state.address
            ).then(
                (response) => {
                    this.setState({
                        message: response.data.message,
                        successful: true,
                    });
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
        AuthCustomer.delete(id)
            .then((response) => {
                this.setState({
                    message: response.data.message,
                    successful: true,
                });
                console.log("Customer edit ->", response);
                const { history } = this.props;
                history.push("/customer/" + response.data.message);
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
                                    <Card.Title as="h5">Update Customer</Card.Title>
                                ) : (
                                    <Card.Title as="h5">New Customer</Card.Title>
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
                                                <label htmlFor="name">Name</label>
                                                <Input
                                                    type="text"
                                                    className="form-control"
                                                    name="name"
                                                    value={this.state.name}
                                                    onChange={this.onChangeName}
                                                    validations={[required]}
                                                    placeholder="Input Name here. ."
                                                />
                                            </Col>
                                        </Row>
                                        <br />
                                        <Row>
                                            {isEdit ? (
                                                <Col>
                                                    <label htmlFor="born">Born</label>
                                                    <Datetime
                                                        name="born"
                                                        timeFormat={false}
                                                        value={this.state.bornShow}
                                                        onChange={this.onChangeBorn}
                                                        inputProps={{ placeholder: "Select Date Born" }}
                                                    />
                                                </Col>
                                            ) : (
                                                <Col>
                                                    <label htmlFor="born">Born</label>
                                                    <Datetime
                                                        name="born"
                                                        timeFormat={false}
                                                        value={this.state.born}
                                                        onChange={this.onChangeBorn}
                                                        inputProps={{ placeholder: "Select Date Born" }}
                                                    />
                                                </Col>
                                            )}
                                            <Col>
                                                <Col>
                                                    <label htmlFor="address">Address</label>
                                                    <Input
                                                        type="text"
                                                        className="form-control"
                                                        name="address"
                                                        value={this.state.address}
                                                        onChange={this.onChangeAddress}
                                                        validations={[required]}
                                                        placeholder="Input Addreess here. ."
                                                    />
                                                </Col>
                                            </Col>
                                        </Row>
                                        <br />
                                        <br />
                                        <div className="form-group">
                                            {isEdit ? (
                                                <Row>
                                                    <Col>
                                                        <button className="btn btn-primary btn-block">
                                                            Update Customer
                                                        </button>
                                                    </Col>
                                                    <Col>
                                                        <button className="btn btn-danger btn-block" onClick={() => {
                                                            this.deleteById(id);
                                                        }}>
                                                            Delete Customer
                                                        </button>
                                                    </Col>
                                                </Row>
                                            ) : (
                                                <button className="btn btn-primary btn-block">
                                                    Save New Customer
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

export default Customer;
