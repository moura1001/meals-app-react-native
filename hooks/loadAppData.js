import { useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { getFilters } from '../store/actions/meals';

export default function loadAppData() {
    const dispatch = useDispatch();

    const loadAppData = useCallback(async () =>{
      try {
        await dispatch(getFilters());
        console.log("Preferences loaded successfully");
      } catch (error) {
        console.log(error.message);
        alert("Sorry, something went wrong on fetch data.");
      }
    }, [dispatch]);
  
    useEffect(loadAppData, []);
};