import { API_URL, KEY, RES_PER_PAGE } from './config.js';
import { AJAX } from './helpers.js';
const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
  },
  bookmarks: [],
};

const getRecipe = function (data) {
  const { recipe } = data.data;
  return {
    id: recipe.id,
    title: recipe.title,
    publisher: recipe.publisher,
    sourceUrl: recipe.source_url,
    image: recipe.image_url,
    servings: recipe.servings,
    cookingTime: recipe.cooking_time,
    ingredients: recipe.ingredients,
    ...(recipe.key && { key: recipe.key }),
  };
};

const loadRecipe = async function (id) {
  try {
    const data = await AJAX(`${API_URL}${id}?key=${KEY}`);
    state.recipe = getRecipe(data);
    checkBookmark();
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
      ...(recipe.key && { key: recipe.key }),
    };
  });
};

const loadSearchResults = async function (query) {
  try {
    const data = await AJAX(`${API_URL}?search=${query}&key=${KEY}`);
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

const updateServings = function (newServings) {
  state.recipe.ingredients.forEach(ing => {
    ing.quantity = (ing.quantity / state.recipe.servings) * newServings;
  });
  state.recipe.servings = newServings;
};

const toggleBookmark = function (recipe) {
  // Add to bookmarks array
  const newBookmarks = state.bookmarks.filter(bm => bm.id !== recipe.id);
  if (newBookmarks.length !== state.bookmarks.length) {
    if (recipe.id === state.recipe.id) state.recipe.bookmark = false;
    state.bookmarks = newBookmarks;
    return;
  }
  state.bookmarks.push(recipe);

  // Mark Current recipe as bookmark
  if (recipe.id === state.recipe.id) state.recipe.bookmark = true;
};

const checkBookmark = function () {
  if (state.bookmarks.some(bm => state.recipe.id === bm.id))
    state.recipe.bookmark = true;
  else state.recipe.bookmark = false;
};

const initialiseBookmarks = function (storedBookmarks) {
  state.bookmarks = storedBookmarks ?? [];
};

const generateRecipeFormat = function (recipeData, ingredients) {
  return {
    title: recipeData.title,
    source_url: recipeData.sourceUrl,
    image_url: recipeData.image,
    publisher: recipeData.publisher,
    cooking_time: +recipeData.cookingTime,
    servings: +recipeData.servings,
    ingredients,
  };
};

const fetchIngredients = async function (recipeData) {
  try {
    return Object.entries(recipeData)
      .filter(entry => entry[0].startsWith('ingredient') && entry[1] !== '')
      .map(ing => {
        const ingArr = ing[1].split(',').map(el => el.trim());
        // const ingArr = ing[1].replaceAll(' ', '').split(',');
        if (ingArr.length !== 3)
          throw new Error(
            'Invalid Ingredient Format, Please use the correct format'
          );
        const [quantity, unit, description] = ingArr;
        return { quantity: quantity ? +quantity : null, unit, description };
      });
  } catch (err) {
    throw err;
  }
};

const uploadRecipe = async function (recipeData) {
  try {
    const ingredients = await fetchIngredients(recipeData);
    const recipe = generateRecipeFormat(recipeData, ingredients);
    const returnedData = await AJAX(`${API_URL}?key=${KEY}`, recipe);
    state.recipe = getRecipe(returnedData);
    toggleBookmark(state.recipe);
  } catch (err) {
    throw err;
  }
};

export {
  state,
  loadRecipe,
  loadSearchResults,
  getSearchResultsPage,
  increaseCurrPage,
  decreaseCurrPage,
  updateServings,
  toggleBookmark,
  initialiseBookmarks,
  uploadRecipe,
};
