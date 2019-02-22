import React from "react";

const RecipeInfo = props => {
  return (
    <figure className="recipe__fig">
      <img src={props.img} alt="Tomato" className="recipe__img" />
      <h1 className="recipe__title">
        <span>{props.title}</span>
      </h1>
    </figure>
  );
};

export default RecipeInfo;
