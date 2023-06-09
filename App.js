import React, { useEffect, useRef, useState } from 'react'
import { Button, View, StyleSheet, Text, Alert } from 'react-native'
import Login from './Screens/Login'
import TopTabs from './Screens/TopTabs'
import {NavigationContainer,useNavigationContainerRef} from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import MovieDetails from './Screens/MovieDetails'
import TvDetails from './Screens/TvDeatils'
import SearchDetails from './Screens/SearchDetails'
import Details from './Screens/Details'
import CustomHeader from './Screens/CustomHeader'

const Stack = createNativeStackNavigator()

export default function App() {
  const navigationRef = useNavigationContainerRef()

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="TopTabs">
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="TopTabs"
          component={TopTabs}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="MovieDetails"
          component={MovieDetails}
          options={{ headerTitle: '', headerLeft: () => <CustomHeader /> }}
        />
        <Stack.Screen
          name="TvDetails"
          component={TvDetails}
          options={{ headerTitle: '', headerLeft: () => <CustomHeader /> }}
        />
        <Stack.Screen
          name="SearchDetails"
          component={SearchDetails}
          options={{  headerTitle: '', headerLeft: () => <CustomHeader /> }}
        />
        <Stack.Screen
          name="Details"
          component={Details}
          options={{ headerTitle: '', headerLeft: () => <CustomHeader /> }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
