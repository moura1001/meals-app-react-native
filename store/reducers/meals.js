import { TOGGLE_FAVORITE, SET_FILTERS, SET_MEALS } from "../actions/meals"

const initialState = {
  meals: [],
  filters: {},
  filteredMeals: [],
  favoriteMeals: []
};

const mealsReducer = (state = initialState, action) => {
  switch(action.type){
    case TOGGLE_FAVORITE:
      const existingIndex = state.favoriteMeals.findIndex(
        meal => meal.id === action.mealId
      );
      if(existingIndex >= 0){
        const updatedFavMeals = [...state.favoriteMeals];
        updatedFavMeals.splice(existingIndex, 1);
        return { ...state, favoriteMeals: updatedFavMeals };
      } else{
        const meal = state.meals.find(meal => meal.id === action.mealId);
        return { ...state, favoriteMeals: state.favoriteMeals.concat(meal) };
      }
    
    case SET_FILTERS:
      const appliedFilters = action.filters;
      const updatedFilteredMeals = state.meals.filter(meal => {
        if(appliedFilters.glutenFree && !meal.isGlutenFree){
          return false;
        }
        if(appliedFilters.lactoseFree && !meal.isLactoseFree){
          return false;
        }
        if(appliedFilters.vegetarian && !meal.isVegetarian){
          return false;
        }
        if(appliedFilters.vegan && !meal.isVegan){
          return false;
        }
        return true;
      });
      return { ...state,
        filteredMeals: updatedFilteredMeals,
        filters: appliedFilters };
    
    case SET_MEALS:
      return { ...state, meals: action.meals };
    
    default:
      return state;
  }
}

export default mealsReducer;