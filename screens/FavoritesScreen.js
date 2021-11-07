import React, { useEffect } from 'react';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import HeaderButton from '../components/HeaderButton';
import MealList from '../components/MealList';
import { MEALS } from '../data/dummy-data';

const FavoritesScreen = props => {
  const favMeals = MEALS.filter(meal => meal.id === 'm1' || meal.id === 'm2');

  useEffect(() => {
    props.navigation.setOptions(navigationOptions(props.navigation));
  }, []);

  return <MealList listData={favMeals} navigation={props.navigation} />;
};

const navigationOptions = navigation => {
  return {
    headerTitle: 'Your Favorites',
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Menu"
          iconName="ios-menu"
          onPress={() => {
            navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    )
  };
};

export default FavoritesScreen;
