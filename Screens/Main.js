import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'

const Home = () => {
  const navigation = useNavigation()
  return (
    <View>
      <Text style={{ textAlign: 'center', marginBottom: 300, fontSize: 25 }}>
        This is main page..
      </Text>
    </View>
  )
}

export default Home
