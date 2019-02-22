import React, { Component } from "react";

export const LikeItem = props => {
  return (
    <div>
      <ul className="likes__list" onClick={props.onClick}>
        <li>
          <a className="likes__link" href="#23456">
            <figure className="likes__fig">
              <img src={props.element.img} alt="Test" />
            </figure>
            <div className="likes__data">
              <h4 className="likes__name">{props.element.title}</h4>
              <p className="likes__author">{props.element.author}</p>
            </div>
          </a>
        </li>
      </ul>
      <button className="like-delete btn-tiny" onClick={props.onChangeDelete}>
        x
      </button>
    </div>
  );
};

class Likes extends Component {
  render() {
    if (this.props.likeList.length === 0) {
      return (
        <div className="likes">
          <div className="likes__field">
            <svg className="likes__icon">
              <use href="img/icons.svg#icon-heart-outlined" />
            </svg>
          </div>
        </div>
      );
    } else {
      return (
        <div className="likes">
          <div className="likes__field">
            <svg className="likes__icon">
              <use href="img/icons.svg#icon-heart" />
            </svg>
          </div>
          <div className="likes__panel">
            {this.props.likeList.map((el, index) => {
              return (
                // delete by index here
                <LikeItem
                  key={index}
                  element={el}
                  onClick={() => this.props.onChangeLike(el.id)}
                  onChangeDelete={() => this.props.onChangeDelete(index)}
                />
              );
            })}
          </div>
        </div>
      );
    }
  }
}

export default Likes;
