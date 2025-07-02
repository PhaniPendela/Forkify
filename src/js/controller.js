import * as model from './model.js';
import recipeView from './views/recipeView.js';
// import searchResultsView from './views/searchResultsView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import createRecipeView from './views/createRecipeView.js';
import bookmarksView from './views/bookmarksView.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { MODEL_CLOSE_SEC } from './config.js';
// import { RES_PER_PAGE } from './config.js';

// if (module.hot) {
//   module.hot.accept();
// }

// NEW API URL (instead of the one shown in the video)
// https://forkify-api.jonas.io

///////////////////////////////////////

const controlAddRecipe = async function (newRecipeData) {
  try {
    // Render Spinner
    createRecipeView.renderSpinner();
    // Wait for Uploading Recipe
    await model.uploadRecipe(newRecipeData);
    // Save Bookmark to LocalStorage
    storeBookmarks();
    // Display Success message
    createRecipeView.renderMessage();
    // Render Bookmark View
    bookmarksView.render(model.state.bookmarks);
    // Change ID in URL
    window.history.pushState(null, '', `#${model.state.recipe.id}`);
    // Hide window
    setTimeout(() => createRecipeView.toggleWindow(), MODEL_CLOSE_SEC * 1000);
    // Render Recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    createRecipeView.renderError(`${err.message}`);
  }
};

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);

    if (!id) return;
    recipeView.renderSpinner();
    // 0. Update results View to highlight the selected recipe
    resultsView.update(model.getSearchResultsPage());
    bookmarksView.update(model.state.bookmarks);
    // 1. Loading Recipe
    await model.loadRecipe(id);
    // 2. Rendering Recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderError();
  }
};

const controlServings = function (numServings) {
  // Update State
  model.updateServings(numServings);
  // Render
  recipeView.update(model.state.recipe);
  // renderRecipe(recipe, controlServings);
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

const storeBookmarks = function () {
  localStorage.setItem('bookmarks', JSON.stringify(model.state.bookmarks));
};

const controlToggleBookmark = function () {
  model.toggleBookmark(model.state.recipe);
  recipeView.update(model.state.recipe);
  bookmarksView.render(model.state.bookmarks);
  storeBookmarks();
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
  model.initialiseBookmarks(JSON.parse(localStorage.getItem('bookmarks')));
  bookmarksView.render(model.state.bookmarks);
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerServings(controlServings);
  recipeView.addHandlerBookmark(controlToggleBookmark);
  searchView.addSearchHandler(controlSearchResults);
  paginationView.addPageHandler(nextPage, prevPage);
  createRecipeView.addHandlerUpload(controlAddRecipe);
})();
