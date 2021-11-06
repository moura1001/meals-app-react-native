import React from 'react';
import { Platform, Text } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';
import { createMaterialBottomTabNavigator } from '@react-navigation/bottom-tabs';

import CategoriesScreen from '../screens/CategoriesScreen';
import CategoryMealsScreen from '../screens/CategoryMealsScreen';
import MealDetailScreen from '../screens/MealDetailScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import FiltersScreen from '../screens/FiltersScreen';
import Colors from '../constants/Colors';

const Stack = createNativeStackNavigator();

const defaultStackNavOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : ''
  },
  headerTitleStyle: {
    fontFamily: 'open-sans-bold'
  },
  headerBackTitleStyle: {
    fontFamily: 'open-sans'
  },
  headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primaryColor,
  headerTitle: 'A Screen'
};

function MealsNavigator(){
  return(
    <Stack.Navigator
    //initialRouteName="Home"
    screenOptions={defaultStackNavOptions}
    >
      <Stack.Screen
        name="Categories"
        component={CategoriesScreen}
        //options={{
        //  title: 'Awesome app',
        //}}
      />
      <Stack.Screen
        name="CategoryMeals"
        component={CategoryMealsScreen}
        //options={{
        //  title: 'My profile',
        //}}
      />
      <Stack.Screen
        name="MealDetail"
        component={MealDetailScreen}
        //options={{
        //  gestureEnabled: false,
        //}}
      />
    </Stack.Navigator>
  );
}

/*const MealsNavigator = createStackNavigator(
  {
    Categories: {
      screen: CategoriesScreen
    },
    CategoryMeals: {
      screen: CategoryMealsScreen
    },
    MealDetail: MealDetailScreen
  },
  {
    // initialRouteName: 'Categories',
    defaultNavigationOptions: defaultStackNavOptions
  }
);*/

function FavNavigator(){
  return(
    <Stack.Navigator
    //initialRouteName="Home"
    screenOptions={defaultStackNavOptions}
    >
      <Stack.Screen
        name="Favorites"
        component={FavoritesScreen}
        //options={{
        //  title: 'Awesome app',
        //}}
      />
      <Stack.Screen
        name="MealDetail"
        component={MealDetailScreen}
        //options={{
        //  title: 'My profile',
        //}}
      />
    </Stack.Navigator>
  );
}

/*const FavNavigator = createStackNavigator(
  {
    Favorites: FavoritesScreen,
    MealDetail: MealDetailScreen
  },
  {
    // initialRouteName: 'Categories',
    defaultNavigationOptions: defaultStackNavOptions
  }
);*/

const Tab = createMaterialBottomTabNavigator();

function MealsFavTabNavigator(){
  return(
    <Tab.Navigator
      //initialRouteName="Feed"
      screenOptions={  Platform.OS === 'android'
      ? {
          activeTintColor: 'white',
          shifting: true,
          barStyle: {
            backgroundColor: Colors.primaryColor
          }
        }
      : {
          tabBarOptions: {
            labelStyle: {
              fontFamily: 'open-sans'
            },
            activeTintColor: Colors.accentColor
          }
        }}
    >
      <Tab.Screen
        name="Meals"
        component={MealsNavigator}
        options={{
          tabBarIcon: tabInfo => {
            return (
              <Ionicons name="ios-restaurant" size={25} color={tabInfo.color} />
            );
          },
          tabBarColor: Colors.primaryColor,
          tabBarLabel:
            Platform.OS === 'android' ? (
              <Text style={{ fontFamily: 'open-sans-bold' }}>Meals</Text>
            ) : (
              'Meals'
            )
        }}
      />
      <Tab.Screen
        name="Favorites"
        component={FavNavigator}
        options={{
          tabBarIcon: tabInfo => {
            return <Ionicons name="ios-star" size={25} color={tabInfo.color} />;
          },
          tabBarColor: Colors.accentColor,
          tabBarLabel:
            Platform.OS === 'android' ? (
              <Text style={{ fontFamily: 'open-sans-bold' }}>Favorites</Text>
            ) : (
              'Favorites'
            )
        }}
      />
    </Tab.Navigator>
  );
}

/*const tabScreenConfig = {
  Meals: {
    screen: MealsNavigator,
    navigationOptions: {
      tabBarIcon: tabInfo => {
        return (
          <Ionicons name="ios-restaurant" size={25} color={tabInfo.tintColor} />
        );
      },
      tabBarColor: Colors.primaryColor,
      tabBarLabel:
        Platform.OS === 'android' ? (
          <Text style={{ fontFamily: 'open-sans-bold' }}>Meals</Text>
        ) : (
          'Meals'
        )
    }
  },
  Favorites: {
    screen: FavNavigator,
    navigationOptions: {
      tabBarIcon: tabInfo => {
        return <Ionicons name="ios-star" size={25} color={tabInfo.tintColor} />;
      },
      tabBarColor: Colors.accentColor,
      tabBarLabel:
        Platform.OS === 'android' ? (
          <Text style={{ fontFamily: 'open-sans-bold' }}>Favorites</Text>
        ) : (
          'Favorites'
        )
    }
  }
};

const MealsFavTabNavigator =
  Platform.OS === 'android'
    ? createMaterialBottomTabNavigator(tabScreenConfig, {
        activeTintColor: 'white',
        shifting: true,
        barStyle: {
          backgroundColor: Colors.primaryColor
        }
      })
    : createBottomTabNavigator(tabScreenConfig, {
        tabBarOptions: {
          labelStyle: {
            fontFamily: 'open-sans'
          },
          activeTintColor: Colors.accentColor
        }
      });*/

/*const FiltersNavigator = createStackNavigator(
  {
    Filters: FiltersScreen
  },
  {
    // navigationOptions: {
    //   drawerLabel: 'Filters!!!!'
    // },
    defaultNavigationOptions: defaultStackNavOptions
  }
);*/

function FiltersNavigator(){
  return(
    <Stack.Navigator
    //initialRouteName="Home"
    screenOptions={defaultStackNavOptions}
    >
      <Stack.Screen
        name="Filters"
        component={FiltersScreen}
        //options={{
        //  title: 'Awesome app',
        //}}
      />
    </Stack.Navigator>
  );
}

const Drawer = createDrawerNavigator();

/*const MainNavigator = createDrawerNavigator(
  {
    MealsFavs: {
      screen: MealsFavTabNavigator,
      navigationOptions: {
        drawerLabel: 'Meals'
      }
    },
    Filters: FiltersNavigator
  },
  {
    contentOptions: {
      activeTintColor: Colors.accentColor,
      labelStyle: {
        fontFamily: 'open-sans-bold'
      }
    }
  }
);*/

function MainNavigator(){
  return(
    <Drawer.Navigator
    //initialRouteName="Home"
    screenOptions={{
      drawerActiveTintColor: Colors.accentColor,
      drawerLabelStyle: {
        fontFamily: 'open-sans-bold'
      }
    }}
    >
      <Drawer.Screen
        name="MealsFavs"
        component={MealsFavTabNavigator}
        options={{
          drawerLabel: 'Meals'
        }}
      />
      <Drawer.Screen
        name="Filters"
        component={FiltersNavigator}
        //options={{
        //  title: 'Awesome app',
        //}}
      />
    </Drawer.Navigator>
  );
}

export default MainNavigator;
