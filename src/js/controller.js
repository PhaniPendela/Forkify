import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchResultsView from './views/searchResultsView.js';
import searchView from './views/searchView.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

// NEW API URL (instead of the one shown in the video)
// https://forkify-api.jonas.io

///////////////////////////////////////

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);

    if (!id) return;
    recipeView.renderSpinner();
    // 1. Loading Recipe
    await model.loadRecipe(id);
    const { recipe } = model.state;
    // 2. Rendering Recipe
    recipeView.render(recipe);
  } catch (err) {
    recipeView.renderError();
  }
};

const controlSearchResults = async function (e) {
  e.preventDefault();
  try {
    searchResultsView.renderSpinner();
    const query = searchView.getQuery();
    await model.loadSearchResults(query);
    console.log(model.state.search.results);
    searchView.clearSearchBar();
    searchResultsView.render(model.state.search.results);
  } catch (err) {
    console.log(err);
  }
};
// const init = function () {
//   recipeView.addHandlerRender(controlRecipes)
// };
// window.addEventListener('load', showRecipe);
// window.addEventListener('hashchange', showRecipe);
// IIFE (Init)
(() => {
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandler(controlSearchResults);
})();
