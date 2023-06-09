import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const CustomHeader = () => {
  const navigation = useNavigation();

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <View style={{ flexDirection: 'row' }}>
      <TouchableOpacity onPress={handleGoBack} style={{marginRight:5}}>
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>
      <TouchableOpacity onPress={handleGoBack}>
      <Text style={{fontSize:18, marginBottom:1, fontWeight:"bold" }}>Back to List</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CustomHeader;
