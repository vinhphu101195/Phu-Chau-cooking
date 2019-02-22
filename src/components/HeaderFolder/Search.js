import React, { Component } from "react";

class Search extends Component {
  onClick = e => {
    e.preventDefault();
    this.props.onChange(this.query.value);
    this.query.value = "";
  };
  render() {
    return (
      <form className="search">
        <input
          type="text"
          className="search__field"
          placeholder="Search over 1,000,000 recipes..."
          ref={input => {
            this.query = input;
          }}
        />
        <button className="btn search__btn" onClick={this.onClick}>
          <svg className="search__icon">
            <use href="img/icons.svg#icon-magnifying-glass" />
          </svg>
          <span>Search</span>
        </button>
      </form>
    );
  }
}

export default Search;
