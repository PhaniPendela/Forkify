import * as model from './model.js';
import recipeView from './views/recipeView.js';

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
    recipeView.renderError(`${err} 🌟🌟🌟🌟`);
  }
};
(() => {
  recipeView.addHandlerRender(controlRecipes);
})();
// const init = function () {
//   recipeView.addHandlerRender(controlRecipes)
// };
// window.addEventListener('load', showRecipe);
// window.addEventListener('hashchange', showRecipe);
