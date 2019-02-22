import React, { Component } from "react";
import Header from "./components/HeaderFolder/Header";
import Results from "./components/ResultFolder/Results";
import Recipe from "./components/RecipeFolder/Recipe";
import Shoppings from "./components/ShoppingFolder/Shoppings";
import axios from "axios";
import { key, key1, key2, proxy } from "./config";

class App extends Component {
  state = {
    query: [],
    body: {},
    shoppingList: [],
    likeList: [],
    keepBody: {},
    active: false,
    loader: false,
    loader2: false
  };

  async getAPI(query) {
    try {
      const res = await axios(
        `${proxy}http://food2fork.com/api/search?key=${key}&q=${query}`
      );
      // the result of recipe
      const result = res.data.recipes;
      this.setState({
        query: result
      });
    } catch (error) {
      alert(error);
    }
  }

  async getRecipe(id) {
    try {
      const res = await axios(
        `${proxy}http://food2fork.com/api/get?key=${key}&rId=${id}`
      );
      this.setState({
        body: res.data.recipe
      });
      var button = false;

      for (var i = 0; i < this.state.likeList.length; i++) {
        if (res.data.recipe.recipe_id === this.state.likeList[i].id) {
          button = true;
          break;
        }
      }
      button
        ? this.setState({ active: true })
        : this.setState({ active: false });
    } catch (error) {
      console.log(error);
      alert("du ma sai roi");
    }
  }

  onChangeRecipe = shopping => {
    var button = false;
    if (this.state.shoppingList.length === 0) {
      this.setState({
        shoppingList: [...this.state.shoppingList, shopping]
      });
    } else {
      for (var i = 0; i < this.state.shoppingList.length; i++) {
        if (shopping.id === this.state.shoppingList[i].id) {
          button = true;
          break;
        }
      }
      if (button === true) {
        alert("it's added");
      } else {
        this.setState({
          shoppingList: [...this.state.shoppingList, shopping]
        });
      }
    }
  };

  onChangeLike = like => {
    var button = false;
    if (this.state.likeList.length === 0) {
      this.setState({
        likeList: [...this.state.likeList, like],
        active: !this.state.active
      });
    } else {
      for (var i = 0; i < this.state.likeList.length; i++) {
        if (like.id === this.state.likeList[i].id) {
          button = true;
          break;
        }
      }
      if (button === true) {
        alert("it's added");
      } else {
        this.setState({
          likeList: [...this.state.likeList, like],
          active: !this.state.active
        });
      }
    }
  };

  onChangeDelete = index => {
    this.state.likeList.splice(index, 1);
    var newLikeList = this.state.likeList;
    this.setState({
      likeList: newLikeList
    });
  };

  render() {
    return (
      <div className="container">
        <Header
          onChange={query => {
            this.getAPI(query);
            console.log("run app");
            this.setState({
              query: [],
              loader: true
            });
          }}
          likeList={this.state.likeList}
          onChangeLike={id => {
            this.setState({
              body: {},
              loader: true
            });
            this.getRecipe(id);
            console.log("get id from like");
          }}
          onChangeDelete={this.onChangeDelete}
        />

        <Results
          loader={this.state.loader}
          query={this.state.query}
          onChange={id => {
            this.setState({
              body: {},
              loader2: true
            });
            this.getRecipe(id);
            console.log("get id");
          }}
        />
        <Recipe
          loader2={this.state.loader2}
          body={this.state.body}
          onChange={shopping => this.onChangeRecipe(shopping)}
          onChangeLike={like => this.onChangeLike(like)}
          active={this.state.active}
        />
        {<Shoppings shoppingList={this.state.shoppingList} />}
      </div>
    );
  }
}

export default App;
