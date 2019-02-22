import React, { Component } from "react";
import ShoppingItem from "./ShoppingItem";

class Shoppings extends Component {
  render() {
    return (
      <div className="shopping">
        <h2 className="heading-2">My Shopping List</h2>

        <ul className="shopping__list">
          <ShoppingItem shoppingList={this.props.shoppingList} />
        </ul>

        <div className="copyright">
          &copy; by Phu Chau. Powered by
          <a href="http://food2fork.com" target="_blank" className="link">
            Food2Fork.com
          </a>
          .
        </div>
      </div>
    );
  }
}

export default Shoppings;
