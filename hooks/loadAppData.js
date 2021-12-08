import { useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { getFilters, getMeals } from '../store/actions/meals';

export default function loadAppData() {
    const dispatch = useDispatch();

    const loadAppData = useCallback(async () =>{
      try {
        await dispatch(getFilters());
        console.log("Preferences have been loaded successfully");

        await dispatch(getMeals());
        console.log("Meals have been loaded successfully");
      } catch (error) {
        console.log(error.message);
        alert("Sorry, something went wrong on fetch data.");
      }
    }, [dispatch]);
  
    useEffect(loadAppData, []);
};