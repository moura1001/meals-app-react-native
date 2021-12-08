import { firestore } from "../../config/firebase";
import {
  collection, getDocs,
  doc, setDoc,
  query, orderBy
} from "firebase/firestore";

export const TOGGLE_FAVORITE = "TOGGLE_FAVORITE";
export const toggleFavorite = (mealId) => ({
  type: TOGGLE_FAVORITE,
  mealId
});

export const SET_FILTERS = "SET_FILTERS";
export const setFilters = (filters) => {
  return async (dispatch, getState) => {
    try {
      const colRef = collection(firestore, "filters");
      const snapshot = await getDocs(colRef);
      const docRef = doc(firestore, "filters", snapshot.docs[0].id)
      await setDoc(docRef, {...filters});

      dispatch({
        type: SET_FILTERS,
        filters
      });
    
    } catch (error) {
      throw error;
    }
  }
};

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

export const SET_MEALS = "SET_MEALS";
export const getMeals = () => {
  return async (dispatch, getState) => {
    try {
      const meals = [];
      const colRef = collection(firestore, "meals");
      const q = query(colRef, orderBy("id"));
      const snapshot = await getDocs(q);
      snapshot.docs.forEach((doc) => {
        meals.push(doc.data());
      });

      dispatch({
        type: SET_MEALS,
        meals
      });

      dispatch({
        type: SET_FILTERS,
        filters: getState().meals.filters
      });
    
    } catch (error) {
      throw error;
    }
  }
};