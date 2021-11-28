import React, { Component } from "react";
import { Button } from "react-bootstrap";
import Aux from "../../../../../hoc/_Aux";
import { Link } from "react-router-dom";

class NavRight extends Component {
  state = {
    listOpen: false,
  };

  render() {
    return (
      <Aux>
        <ul className="navbar-nav ml-auto">
          {/* <li>
            <Link to="/login">
              <Button renderAs="button" variant="link">
                <i className="feather icon-log-out" />&nbsp;&nbsp;&nbsp;&nbsp; Logout
              </Button>
            </Link>
          </li> */}
        </ul>
      </Aux>
    );
  }
}

export default NavRight;
