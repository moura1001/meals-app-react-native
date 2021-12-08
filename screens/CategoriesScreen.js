import React, { useEffect } from 'react';
import {
  FlatList,
  StyleSheet,
  ActivityIndicator
} from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import HeaderButton from '../components/HeaderButton';
import CategoryGridTile from '../components/CategoryGridTile';
import { auth } from '../config/firebase';
import { signOut } from 'firebase/auth';
import useCategories from '../hooks/useCategories';
import loadAppData from '../hooks/loadAppData';

const CategoriesScreen = props => {
  const { navigation, route } = props;
  const nickname = route.params?.nickname;

  loadAppData();
  
  const { categories, loading } = useCategories();
  
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
      ListEmptyComponent={() => {
        if(loading){
          return <ActivityIndicator size="large" color="#0000ff" />
        }
        
        return null;
      }}
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
