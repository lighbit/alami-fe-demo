import React, { Component } from "react";
import windowSize from "react-window-size";
import Aux from "../../../../../../hoc/_Aux";

class NavSearch extends Component {
  state = {
    isSearch: false,
  };

  componentDidMount() {
  }

  render() {
    const searchSyle = this.state.isSearch ? "block" : "none";
    return (
      <Aux>
        <div>
          {/* <h5>
            <font color={"white"}>{decryptString}</font>
          </h5> */}
        </div>
        <div className="search-bar" style={{ display: searchSyle }}></div>
      </Aux>
    );
  }
}

export default windowSize(NavSearch);
