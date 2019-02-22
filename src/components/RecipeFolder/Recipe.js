import React, { Component } from "react";
import RecipeHeader from "./RecipeHeader";
import RecipeItem from "./RecipeItem";
import RecipeDirection from "./RecipeDirection";
import RecipeInfo from "./RecipeInfo";
import Loader from "../loader/Loader";

export class Recipe extends Component {
  state = {
    serving: 4
  };

  onChange = value => {
    this.setState({
      serving: value
    });
  };

  render() {
    var { body } = this.props;
    var {
      recipe_id = ``,
      image_url = ``,
      title = ``,
      publisher = ``,
      source_url = ``,
      ingredients = null
    } = body;
    var time;
    if (ingredients !== null) {
      time = (ingredients.length / 3) * 15;
    }
    if (
      Object.getOwnPropertyNames(body).length === 0 &&
      this.props.loader2 === true
    ) {
      return <Loader />;
    } else if (Object.getOwnPropertyNames(body).length !== 0) {
      return (
        <div className="recipe">
          <RecipeInfo img={image_url} title={title} />

          <RecipeHeader
            time={time}
            active={this.props.active}
            serving={this.state.serving}
            onChange={this.onChange}
            onChangeLike={() => {
              this.props.onChangeLike({
                id: recipe_id,
                img: image_url,
                author: publisher,
                title: title
              });
            }}
          />

          <RecipeItem
            ingredients={ingredients}
            serving={this.state.serving}
            onChange={() => {
              this.props.onChange({
                id: recipe_id,
                ingredients: ingredients
              });
            }}
          />

          <RecipeDirection author={publisher} source={source_url} />
        </div>
      );
    } else {
      return <div className="recipe" />;
    }
  }
}

export default Recipe;
