import { API_URL } from './config.js';
import { getJSON } from './helpers.js';

const state = {
  recipe: {},
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
    // const res = await fetch(`${API_URL}/${id}`);
    // const data = await res.json();

    // if (!res.ok) throw new Error(`${data.message} ${res.status}`);

    state.recipe = getRecipe(data);
  } catch (err) {
    // Temporary error handling
    // console.error(`${err} *️⃣*️⃣*️⃣`);
    throw err;
  }
};

export { state, loadRecipe };
