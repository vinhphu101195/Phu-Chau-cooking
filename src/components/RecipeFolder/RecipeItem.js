import React, { Component } from "react";
import RecipeItemElement from "./RecipeItemElement";

export class RecipeItem extends Component {
  onClick = () => {
    this.props.onChange();
  };

  render() {
    return (
      <div className="recipe__ingredients">
        <ul className="recipe__ingredient-list">
          <RecipeItemElement
            ingredients={this.props.ingredients}
            serving={this.props.serving}
          />
        </ul>

        <button className="btn-small recipe__btn" onClick={this.onClick}>
          <svg className="search__icon">
            <use href="img/icons.svg#icon-shopping-cart" />
          </svg>
          <span>Add to shopping list</span>
        </button>
      </div>
    );
  }
}

export default RecipeItem;
