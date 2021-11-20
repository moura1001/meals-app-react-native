import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { CATEGORIES } from '../data/dummy-data';
import MealList from '../components/MealList';

const CategoryMealScreen = props => {
  
  const filteredMeals = useSelector(state => state.meals.filteredMeals);
  
  const catId = props.route.params?.categoryId;

  const displayedMeals = filteredMeals.filter(
    meal => meal.categoryIds.indexOf(catId) >= 0
  );

  useEffect(() => {
    props.navigation.setOptions(navigationOptions(props.route));
  }, []);

  return <MealList listData={displayedMeals} navigation={props.navigation} />;
};

const navigationOptions = route => {
  const catId = route.params?.categoryId;

  const selectedCategory = CATEGORIES.find(cat => cat.id === catId);

  return {
    headerTitle: selectedCategory.title
  };
};

export default CategoryMealScreen;
