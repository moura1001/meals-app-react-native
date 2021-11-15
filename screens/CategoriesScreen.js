import React, { useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import HeaderButton from '../components/HeaderButton';
import { CATEGORIES } from '../data/dummy-data';
import CategoryGridTile from '../components/CategoryGridTile';
import Firebase from '../config/firebase';

const CategoriesScreen = props => {
  const { navigation, route } = props;
  const nickname = route.params?.nickname
  
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
      data={CATEGORIES}
      renderItem={renderGridItem}
      numColumns={2}
    />
  );
};

const navigationOptions = (navigation, nickname) => {
  const signOut = async () => {
    try {
      await Firebase.auth().signOut();
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
          onPress={signOut}
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
