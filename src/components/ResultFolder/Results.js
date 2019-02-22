import React, { Component } from "react";
import ResultList from "./ResultList";
import ResultPages from "./ResultPages";
import Loader from "./../loader/Loader";

class Result extends Component {
  state = {
    startPage: 0,
    endPage: 10,
    activeId: 0
  };
  onChange = value => {
    this.setState({
      endPage: 10 * value,
      startPage: (value - 1) * 10
    });
  };

  onClick = id => {
    this.setState({
      activeId: id
    });
    this.props.onChange(id);
  };

  render() {
    if (this.props.loader === true && this.props.query.length === 0) {
      return <Loader />;
    } else {
      return (
        <div className="results">
          <ul className="results__list">
            <ResultList
              query={this.props.query}
              startPage={this.state.startPage}
              endPage={this.state.endPage}
              activeId={this.state.activeId}
              onClick={this.onClick}
            />
          </ul>
          <div className="results__pages">
            <ResultPages query={this.props.query} onChange={this.onChange} />
          </div>
        </div>
      );
    }
  }
}

export default Result;
