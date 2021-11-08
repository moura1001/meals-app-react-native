import React from 'react';
import { Platform, Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import CategoriesScreen from '../screens/CategoriesScreen';
import CategoryMealsScreen from '../screens/CategoryMealsScreen';
import MealDetailScreen from '../screens/MealDetailScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import FiltersScreen from '../screens/FiltersScreen';
import Colors from '../constants/Colors';

const Stack = createStackNavigator();

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
      screenOptions={defaultStackNavOptions}
    >
      <Stack.Screen
        name="Categories"
        component={CategoriesScreen}
      />
      <Stack.Screen
        name="CategoryMeals"
        component={CategoryMealsScreen}
      />
      <Stack.Screen
        name="MealDetail"
        component={MealDetailScreen}
      />
    </Stack.Navigator>
  );
}

function FavNavigator(){
  return(
    <Stack.Navigator
      screenOptions={defaultStackNavOptions}
    >
      <Stack.Screen
        name="Favorites"
        component={FavoritesScreen}
      />
      <Stack.Screen
        name="MealDetail"
        component={MealDetailScreen}
      />
    </Stack.Navigator>
  );
}

const Tab = createMaterialBottomTabNavigator();

function MealsFavTabNavigator(){
  return(
    <Tab.Navigator
      screenOptions={  Platform.OS === 'android'
      ? {
          activeColor: 'white',
          shifting: true,
          barStyle: {
            backgroundColor: Colors.primaryColor
          }
        }
      : {
          activeColor: Colors.accentColor
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
        name="Preferred"
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

function FiltersNavigator(){
  return(
    <Stack.Navigator
      screenOptions={defaultStackNavOptions}
    >
      <Stack.Screen
        name="Filters"
        component={FiltersScreen}
      />
    </Stack.Navigator>
  );
}

const Drawer = createDrawerNavigator();

function MainNavigator(){
  return(
    <Drawer.Navigator
    screenOptions={{
      drawerActiveTintColor: Colors.accentColor,
      drawerLabelStyle: {
        fontFamily: 'open-sans-bold'
      },
      headerShown: false
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
        name="Preferences"
        component={FiltersNavigator}
      />
    </Drawer.Navigator>
  );
}

export default MainNavigator;
