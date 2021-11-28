import React from "react";
import { Row, Col, Button, Form, Card } from "react-bootstrap";
import {
  ValidationForm,
  TextInputGroup,
} from "react-bootstrap4-form-validation";

import Aux from "../../../hoc/_Aux";

class BasicToDo extends React.Component {
  constructor(props) {
    super(props);
    this.formRef = React.createRef();
    this.removeTodo = this.removeTodo.bind(this);
  }

  state = {
    newNote: "",
    newNote2: "",
    cardTodo: [],
  };

  removeTodo(index) {
    let { cardTodo } = this.state;
    cardTodo.splice(index, 1);
    this.setState({
      cardTodo: cardTodo,
    });
  }

  UNSAFE_componentWillMount() {
    const { todoList } = this.props.todoList ? this.props : [];
    todoList.map((single) => {
      this.add(single.note, single.note2, single.complete);
      return false;
    });
  }

  nextId() {
    this.uniqueId = this.uniqueId || 0;
    return this.uniqueId++;
  }

  deleteId() {
    this.uniqueId = this.uniqueId || 0;
    return this.uniqueId++;
  }

  add(text, text2, complete) {
    const { cardTodo } = this.state;
    cardTodo.push({
      id: this.nextId(this),
      note: text,
      note2: text2,
      complete: complete,
    });
  }

  completeHandler = (i) => {
    let newCard = this.state.cardTodo;
    let item = newCard[i];
    item.complete = !item.complete;
    newCard[i] = item;

    this.setState({ cardTodo: newCard });
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmit = (e, formData, inputs) => {
    e.preventDefault();

    this.add(this.state.newNote, this.state.newNote2, false);
    this.setState({ newNote: "" });
    this.setState({ newNote2: "" });
    this.resetForm();
  };

  resetForm = () => {
    let formRef = this.formRef.current;
    formRef.resetValidationState(true);
  };

  handleErrorSubmit = (e, formData, errorInputs) => {
    //console.log(errorInputs);
  };

  render() {
    const todoList = this.state.cardTodo.map((item, index) => {
      return (
        <div key={index}>
          <div className="to-do-list mb-3">
            <div className="d-inline-block">
              <label
                className={[
                  item.complete ? "done-task" : "",
                  "check-task custom-control custom-checkbox d-flex justify-content-center",
                ].join(" ")}
              >
                <input
                  type="checkbox"
                  className="custom-control-input"
                  id="customCheck2"
                  defaultChecked={item.complete}
                  onChange={() => this.completeHandler(index)}
                />
                <span className="custom-control-label">
                  <Card style={{ width: "71rem" }}>
                    <Card.Body>
                      <Row>
                        <Col>
                          <h3>{item.note}</h3>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <p>{item.note2}</p>
                        </Col>
                      </Row>
                    </Card.Body>
                  </Card>
                </span>
              </label>
            </div>
            <div className="float-right">
              <a
                href="#!"
                onClick={this.removeTodo.bind(undefined, index)}
                className="delete_todolist"
              >
                <i className="fa fa-trash-alt" />
              </a>
            </div>
          </div>
        </div>
      );
    });

    return (
      <Aux>
        <Row>
          <Col>
            <ValidationForm
              ref={this.formRef}
              onSubmit={this.handleSubmit}
              onErrorSubmit={this.handleErrorSubmit}
            >
              <Form.Row>
                <Form.Group as={Col}>
                  <TextInputGroup
                    name="newNote"
                    id="newNote"
                    placeholder="Input Your Title here"
                    required
                    value={this.state.newNote}
                    onChange={this.handleChange}
                    autoComplete="off"
                  />
                </Form.Group>
              </Form.Row>
            </ValidationForm>
          </Col>
        </Row>
        <br />
        <Row>
          <Col>
            <ValidationForm
              ref={this.formRef}
              onSubmit={this.handleSubmit}
              onErrorSubmit={this.handleErrorSubmit}
            >
              <Form.Row>
                <Form.Group as={Col}>
                  <TextInputGroup
                    name="newNote2"
                    id="newNote2"
                    placeholder="Input Your Description here"
                    required
                    append={
                      <Button type="submit" variant="primary" className="">
                        Add
                      </Button>
                    }
                    value={this.state.newNote2}
                    onChange={this.handleChange}
                    autoComplete="off"
                  />
                </Form.Group>
              </Form.Row>
            </ValidationForm>
            <div className="new-task">{todoList}</div>
          </Col>
        </Row>
      </Aux>
    );
  }
}

export default BasicToDo;
