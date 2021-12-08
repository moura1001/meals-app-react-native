import { SET_CATEGORIES } from "../actions/categories";

const initialState = {
  categories: []
};

const categoriesReducer = (state = initialState, action) => {
  switch(action.type){
    case SET_CATEGORIES:
      return { ...state, categories: action.categories };
    
    default:
      return state;
  }
}

export default categoriesReducer;