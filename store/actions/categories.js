import { firestore } from "../../config/firebase";
import {
  collection, getDocs,
  query, orderBy
} from "firebase/firestore";

export const SET_CATEGORIES = "SET_CATEGORIES";
export const getCategories = () => {
  return async (dispatch, getState) => {
    try {
      const categories = [];
      const colRef = collection(firestore, "categories");
      const q = query(colRef, orderBy("id"));
      const snapshot = await getDocs(q);
      snapshot.docs.forEach((doc) => {
        categories.push(doc.data());
      });

      dispatch({
        type: SET_CATEGORIES,
        categories
      });
    
    } catch (error) {
      throw error;
    }
  }
};