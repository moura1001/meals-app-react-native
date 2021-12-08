import { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getCategories } from '../store/actions/categories';

export default function useCategories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const categoriesState = useSelector(state => state.categories.categories);

  const dispatch = useDispatch();

  const loadCategories = useCallback(async () =>{
    try {
      await dispatch(getCategories());
      console.log("Categories loaded successfully");
    } catch (error) {
      throw error;
    }
  }, [dispatch]);

  useEffect(() => {
    setCategories([]);
    setLoading(true);
    async function loadData() {
      try {
        loadCategories();
      } catch (error) {
        console.log(error);
        alert("Sorry, something went wrong on fetch categories.");
      }
      setLoading(false);
    }

    const timeout = setTimeout(loadData, 1000)

    return () => {
      clearTimeout(timeout);
    }
  }, []);

  useEffect(() => {
    setCategories(categoriesState);
  }, [categoriesState]);

  return { categories, loading };
};