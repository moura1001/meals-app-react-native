import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import MealList from '../components/MealList';

const CategoryMealScreen = props => {
  
  const categories = useSelector(state => state.categories.categories);

  const filteredMeals = useSelector(state => state.meals.filteredMeals);
  
  const catId = props.route.params?.categoryId;

  const displayedMeals = filteredMeals.filter(
    meal => meal.categoryIds.indexOf(catId) >= 0
  );

  useEffect(() => {
    props.navigation.setOptions(navigationOptions(props.route, categories));
  }, []);

  return <MealList listData={displayedMeals} navigation={props.navigation} />;
};

const navigationOptions = (route, categories) => {
  const catId = route.params?.categoryId;

  const selectedCategory = categories.find(cat => cat.id === catId);

  return {
    headerTitle: selectedCategory.title
  };
};

export default CategoryMealScreen;
