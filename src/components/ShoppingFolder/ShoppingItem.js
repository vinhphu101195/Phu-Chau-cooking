import React from "react";

export const ShoppingItemOnly = props => {
  const newShoppingItem = shopping => {
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
    var item = String(shopping);
    let ingredient = item.toLowerCase();
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
  var newShopping = newShoppingItem(props.shoppingListElement);

  return (
    <li className="shopping__item">
      <div className="shopping__count">
        <input type="number" defaultValue={newShopping.count} step="10" />
        <p>{newShopping.unit}</p>
      </div>
      <p className="shopping__description">{newShopping.ingredient}</p>
      <button className="shopping__delete btn-tiny">
        <svg>
          <use href="img/icons.svg#icon-circle-with-cross" />
        </svg>
      </button>
    </li>
  );
};

const ShoppingItem = props => {
  return props.shoppingList.map(el => {
    return el.ingredients.map((element, index) => {
      return <ShoppingItemOnly key={index} shoppingListElement={element} />;
    });
  });
};

export default ShoppingItem;
