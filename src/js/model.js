import { API_URL } from './config.js';
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
  } catch (err) {
    throw err;
  }
};

export { state, loadRecipe, loadSearchResults };
