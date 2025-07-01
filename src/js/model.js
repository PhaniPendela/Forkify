import { API_URL, RES_PER_PAGE } from './config.js';
import { getJSON } from './helpers.js';
const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
  },
};

const getRecipe = function (data) {
  let { recipe } = data.data;
  return (recipe = {
    id: recipe.id,
    title: recipe.title,
    publisher: recipe.publisher,
    sourceUrl: recipe.source_url,
    image: recipe.image_url,
    servings: recipe.servings,
    cookingTime: recipe.cooking_time,
    ingredients: recipe.ingredients,
  });
};

const loadRecipe = async function (id) {
  try {
    const data = await getJSON(`${API_URL}/${id}`);
    state.recipe = getRecipe(data);
  } catch (err) {
    throw err;
  }
};

const getSearchRecipes = function (data) {
  const { recipes } = data.data;
  return recipes.map(recipe => {
    return {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      image: recipe.image_url,
    };
  });
};

const loadSearchResults = async function (query) {
  try {
    const data = await getJSON(`${API_URL}?search=${query}`);
    state.search.query = query;
    state.search.results = getSearchRecipes(data);
    state.search.pageCount = Math.ceil(
      state.search.results.length / RES_PER_PAGE
    );
    state.search.currPage = 1;
  } catch (err) {
    throw err;
  }
};

const getSearchResultsPage = function () {
  return state.search.results.slice(
    (state.search.currPage - 1) * RES_PER_PAGE,
    state.search.currPage * RES_PER_PAGE
  );
};

const increaseCurrPage = function () {
  state.search.currPage++;
};

const decreaseCurrPage = function () {
  state.search.currPage--;
};

export {
  state,
  loadRecipe,
  loadSearchResults,
  getSearchResultsPage,
  increaseCurrPage,
  decreaseCurrPage,
};
