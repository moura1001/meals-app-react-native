export const TOGGLE_FAVORITE = "TOGGLE_FAVORITE";
export const toggleFavorite = (mealId) => ({
  type: TOGGLE_FAVORITE,
  mealId
});

export const SET_FILTERS = "SET_FILTERS";
export const setFilters = (filters) => ({
  type: SET_FILTERS,
  filters
});