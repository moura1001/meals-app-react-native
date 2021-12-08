import { useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { getFilters, getMeals, getFavoriteMeals } from '../store/actions/meals';

export default function loadAppData() {
    const dispatch = useDispatch();

    const loadAppData = useCallback(async () =>{
      try {
        await dispatch(getFilters());
        console.log("Preferences have been loaded successfully");

        await dispatch(getMeals());
        console.log("Meals have been loaded successfully");

        await dispatch(getFavoriteMeals());
        console.log("Favorite meals have been loaded successfully");
      } catch (error) {
        console.log(error.message);
        alert("Sorry, something went wrong on fetch data.");
      }
    }, [dispatch]);
  
    useEffect(loadAppData, []);
};