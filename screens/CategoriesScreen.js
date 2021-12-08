import React, { useEffect, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useDispatch, useSelector } from 'react-redux';

import HeaderButton from '../components/HeaderButton';
import CategoryGridTile from '../components/CategoryGridTile';
import { auth } from '../config/firebase';
import { signOut } from 'firebase/auth';
import { getFilters } from '../store/actions/meals';
import { getCategories } from '../store/actions/categories';

const CategoriesScreen = props => {
  const { navigation, route } = props;
  const nickname = route.params?.nickname;

  const categories = useSelector(state => state.categories.categories);

  const dispatch = useDispatch();

  const loadAppData = useCallback(async () =>{
    try {
      await dispatch(getFilters());
      console.log("Preferences loaded successfully");

      await dispatch(getCategories());
      console.log("Categories loaded successfully");
    } catch (error) {
      console.log(error.message);
      alert("Sorry, something went wrong on fetch data.");
    }
  }, [dispatch]);

  useEffect(loadAppData, []);
  
  const renderGridItem = itemData => {
    return (
      <CategoryGridTile
        title={itemData.item.title}
        color={itemData.item.color}
        onSelect={() => {
          props.navigation.navigate({
            name: 'CategoryMeals',
            params: {
              categoryId: itemData.item.id
            }
          });
        }}
      />
    );
  };

  useEffect(() => {
    navigation.setOptions(navigationOptions(navigation, nickname));
  }, []);

  return (
    <FlatList
      keyExtractor={(item, index) => item.id}
      data={categories}
      renderItem={renderGridItem}
      numColumns={2}
    />
  );
};

const navigationOptions = (navigation, nickname) => {
  const logout = async () => {
    try {
      await signOut(auth);
      navigation.goBack();
    } catch(error) {
      console.log(error);
    }
  }
  return {
    headerTitle: (nickname != undefined ? nickname : 'Meal Categories'),
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
    ),
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Exit"
          iconName="ios-exit"
          onPress={logout}
        />
      </HeaderButtons>
    )
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default CategoriesScreen;
