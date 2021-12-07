import { firestore } from "../../config/firebase";
import { collection, getDocs } from "firebase/firestore";

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

export const getFilters = () => {
  return async (dispatch, getState) => {
    try {
      const colRef = collection(firestore, "filters");
      const snapshot = await getDocs(colRef);
      const filters = snapshot.docs[0].data();

      dispatch({
        type: SET_FILTERS,
        filters
      });
    
    } catch (error) {
      throw error;
    }
  }
};