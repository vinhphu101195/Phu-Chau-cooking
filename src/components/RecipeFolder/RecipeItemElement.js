import React from "react";
import { Fraction } from "fractional";

var serving2;
export const RecipeItemElementOnly = props => {
  const newIngredients = el => {
    const unitsLong = [
      "tablespoons",
      "tablespoon",
      "ounces",
      "ounce",
      "teaspoons",
      "teaspoon",
      "cups",
      "pounds"
    ];
    const unitShort = [
      "tbsp",
      "tbsp",
      "oz",
      "oz",
      "tsp",
      "tsp",
      "cup",
      "pound"
    ];
    const units = [...unitShort, "kg", "g"]; //for new unit
    // 1 Uniform unit
    let ingredient = el.toLowerCase();
    unitsLong.forEach((unit, i) => {
      ingredient = ingredient.replace(unit, unitShort[i]);
    });

    // 2 remove parentheses
    ingredient = ingredient.replace(/ *\([^)]*\) */g, " ");

    // 3 parse ingredients into count, unit and ingredient
    //convert string to array
    const arrIng = ingredient.split(" ");
    const unitIndex = arrIng.findIndex(el2 => units.includes(el2));

    let objIng;
    if (unitIndex > -1) {
      //there is a unit
      // ex. 4 1/2 cups, arrCount is [4,1/2] --> eval("4+1/2") --> 4.5
      // ex 4 cups, arrCount is [4]
      const arrCount = arrIng.slice(0, unitIndex);

      let count;
      if (arrCount.length === 1) {
        count = eval(arrIng[0].replace("-", "+"));
      } else {
        count = eval(arrIng.slice(0, unitIndex).join("+"));
      }

      objIng = {
        count,
        unit: arrIng[unitIndex],
        ingredient: arrIng.slice(unitIndex + 1).join(" ")
      };
    } else if (parseInt(arrIng[0], 10)) {
      //there is NO unit, but 1st element is number
      objIng = {
        count: parseInt(arrIng[0], 10),
        unit: "",
        ingredient: arrIng.slice(1).join(" ")
      };
    } else if (unitIndex === -1) {
      //there is NO unit and NO number in 1st position
      objIng = {
        count: 1,
        unit: "",
        ingredient
      };
    }
    return objIng;
  };
  props = newIngredients(String(Object.values(props)));

  const calculateIng = (serving, ingredient) => {
    ingredient = ingredient / 4;
    ingredient = ingredient * serving;
    return ingredient;
  };
  const formatCount = count => {
    if (count) {
      // count = 2.5 --> 2 1/2
      // count = 0.5 --> 1/2
      const newCount = Math.round(count * 10) / 10;
      const [int, dec] = newCount
        .toString()
        .split(".")
        .map(el => parseInt(el, 10));

      if (!dec) return newCount;

      if (int === 0) {
        const fr = new Fraction(newCount);
        return `${fr.numerator}/${fr.denominator}`;
      } else {
        const fr = new Fraction(newCount - int);
        return `${int} and ${fr.numerator}/${fr.denominator}`;
      }
    }
    return "?";
  };

  return (
    <li className="recipe__item">
      <svg className="recipe__icon">
        <use href="img/icons.svg#icon-check" />
      </svg>
      <div className="recipe__count">
        {formatCount(calculateIng(serving2, props.count))}
      </div>
      <div className="recipe__ingredient">
        <span className="recipe__unit">{props.unit} </span>
        {props.ingredient}
      </div>
    </li>
  );
};

const RecipeItemElement = props => {
  serving2 = props.serving;
  return props.ingredients.map((el, index) => {
    return <RecipeItemElementOnly key={index} props={el} />;
  });
};

export default RecipeItemElement;
