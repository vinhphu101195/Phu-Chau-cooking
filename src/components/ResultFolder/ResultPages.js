import React, { Component, Fragment } from "react";

export const CreateButton = props => {
  return (
    <button
      className={`btn-inline results__btn--${props.type}`}
      onClick={props.onClick}
    >
      <span>
        Page {props.type === "prev" ? props.page - 1 : props.page + 1}
      </span>
      <svg className="search__icon">
        <use
          href={`img/icons.svg#icon-triangle-${
            props.type === "prev" ? "left" : "right"
          }`}
        />
      </svg>
    </button>
  );
};

class ResultPages extends Component {
  state = {
    page: 1
  };
  onUpPage = e => {
    e.preventDefault();
    this.props.onChange(this.state.page + 1);
    this.setState({
      page: this.state.page + 1
    });
  };
  onDePage = e => {
    e.preventDefault();
    this.props.onChange(this.state.page - 1);
    this.setState({
      page: this.state.page - 1
    });
  };
  render() {
    var { page } = this.state;
    var pages = Math.ceil(this.props.query.length / 10);
    var obNext = {
      page,
      type: "next"
    };
    var obPre = {
      page,
      type: "prev"
    };
    if (page === 1 && pages > 1) {
      return <CreateButton {...obNext} onClick={this.onUpPage} />;
    } else if (page < pages) {
      return (
        <Fragment>
          <CreateButton {...obNext} onClick={this.onUpPage} />
          <CreateButton {...obPre} onClick={this.onDePage} />
        </Fragment>
      );
    } else if (page === pages && pages > 1) {
      // last page
      return <CreateButton {...obPre} onClick={this.onDePage} />;
    } else {
      return null;
    }
  }
}

export default ResultPages;
