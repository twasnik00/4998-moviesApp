import { View, Text } from 'react-native';
import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Movies from './Movies';
import Search from './Search';
import TvShows from './TvShows';
const Tab = createMaterialTopTabNavigator();

const TopTabs = ({ navigation, route }) => {
  // let name = route.params.name
  return (
    <View style={{ flex: 1 }}>
      <View style={{paddingTop:30, backgroundColor:"#404a5c", height:80, justifyContent:"center", alignItems:"center"}}>
        <Text style={{ color: 'white', fontSize: 20, textAlign: 'center'}}>Movies App</Text>
      </View>
      <Tab.Navigator initialRouteName="Home">
        <Tab.Screen name="Movies" component={Movies} />
        <Tab.Screen name="Search Result" component={Search} />
        <Tab.Screen name="Tv Shows" component={TvShows} />  
      </Tab.Navigator>
    </View>
  );
};

export default TopTabs;
