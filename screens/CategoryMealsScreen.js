import React, { useEffect } from 'react';

import { CATEGORIES, MEALS } from '../data/dummy-data';
import MealList from '../components/MealList';

const CategoryMealScreen = props => {
  
  const catId = props.route.params?.categoryId;

  const displayedMeals = MEALS.filter(
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
