import * as model from './model.js';
import recipeView from './views/recipeView.js';
// import searchResultsView from './views/searchResultsView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { RES_PER_PAGE } from './config.js';

if (module.hot) {
  module.hot.accept();
}

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

const controlSearchResults = async function () {
  try {
    // 1. Start to fetch the query
    resultsView.renderSpinner();
    const query = searchView.getQuery();
    if (!query) return;
    // 2. Fectching match results
    await model.loadSearchResults(query);
    // 3. Render them on sidebar
    renderSideBar();
  } catch (err) {
    console.log(err);
  }
};

const renderSideBar = function () {
  const pageData = model.getSearchResultsPage();
  resultsView.render(pageData);
  if (pageData.length === 0) return;
  const { currPage, pageCount } = model.state.search;
  paginationView.render({ currPage, pageCount });
};

const nextPage = function () {
  model.increaseCurrPage();
  renderSideBar();
};

const prevPage = function () {
  model.decreaseCurrPage();
  renderSideBar();
};
// const init = function () {
//   recipeView.addHandlerRender(controlRecipes)
// };
// window.addEventListener('load', showRecipe);
// window.addEventListener('hashchange', showRecipe);
// IIFE (Init)
(() => {
  recipeView.addHandlerRender(controlRecipes);
  searchView.addSearchHandler(controlSearchResults);
  paginationView.addPageHandler(nextPage, prevPage);
})();
