import React, { Component } from "react";
import Search from "./Search";
import Likes from "./Likes";

class Header extends Component {
  render() {
    return (
      <header className="header">
        <img src="img/favicon.png" alt="Logo" className="header__logo" />
        <Search onChange={this.props.onChange} />
        <Likes
          likeList={this.props.likeList}
          onChangeLike={this.props.onChangeLike}
          onChangeDelete={this.props.onChangeDelete}
        />
        {/* nhan likeList roi lam viec */}
      </header>
    );
  }
}

export default Header;
