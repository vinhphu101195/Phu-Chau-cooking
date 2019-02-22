import React from "react";

export const ResultItem = props => {
  const limitRecipeTitle = (title, limit = 17) => {
    const newTitle = [];
    if (title.length > limit) {
      title.split(" ").reduce((acc, cur) => {
        if (acc + cur.length <= limit) {
          newTitle.push(cur);
        }
        return acc + cur.length;
      }, 0);
      //return the result
      return `${newTitle.join(" ")}...`;
    }
    return title;
  };
  return (
    <li onClick={props.onClick} className={props.className}>
      <a className="results__link" href={`#${props.recipe_id}`}>
        <figure className="results__fig">
          <img src={props.image_url} alt={props.title} />
        </figure>
        <div className="results__data">
          <h4 className="results__name">{limitRecipeTitle(props.title)}</h4>
          <p className="results__author">{props.publisher}</p>
        </div>
      </a>
    </li>
  );
};

export const ResultList = props => {
  var { query = [] } = props;

  const child = query.filter(
    (el, index) => index >= props.startPage && index < props.endPage
  );
  return child.map((el, index) => {
    return (
      <ResultItem
        className={`${
          el.recipe_id === props.activeId ? "results__link--active" : ""
        }`}
        key={index}
        {...el}
        onClick={() => props.onClick(el.recipe_id)}
      />
    );
  });
};

export default ResultList;
