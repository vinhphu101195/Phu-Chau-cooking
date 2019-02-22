import React, { Component } from "react";

export class RecipeHeader extends Component {
  onClickMinus = () => {
    if (this.props.serving > 0) {
      var result = this.props.serving - 1;
      this.props.onChange(result);
    } else {
      alert("your serving is 0, you can not do that");
    }
  };

  onClickPlus = () => {
    var result = this.props.serving + 1;
    this.props.onChange(result);
  };

  onClickLike = () => {
    this.props.onChangeLike();
  };

  render() {
    var iconString = this.props.active ? "icon-heart" : "icon-heart-outlined";
    return (
      <div className="recipe__details">
        <div className="recipe__info">
          <svg className="recipe__info-icon">
            <use href="img/icons.svg#icon-stopwatch" />
          </svg>
          <span className="recipe__info-data recipe__info-data--minutes">
            {this.props.time}
          </span>
          <span className="recipe__info-text"> minutes</span>
        </div>
        <div className="recipe__info">
          <svg className="recipe__info-icon">
            <use href="img/icons.svg#icon-man" />
          </svg>
          <span className="recipe__info-data recipe__info-data--people">
            {this.props.serving}
          </span>
          <span className="recipe__info-text"> servings</span>

          <div className="recipe__info-buttons">
            <button className="btn-tiny" onClick={this.onClickMinus}>
              <svg>
                <use href="img/icons.svg#icon-circle-with-minus" />
              </svg>
            </button>
            <button className="btn-tiny" onClick={this.onClickPlus}>
              <svg>
                <use href="img/icons.svg#icon-circle-with-plus" />
              </svg>
            </button>
          </div>
        </div>
        <button className="recipe__love" onClick={this.onClickLike}>
          <svg className="header__likes">
            <use href={`img/icons.svg#${iconString}`} />
          </svg>
        </button>
      </div>
    );
  }
}

export default RecipeHeader;
