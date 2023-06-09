import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  FlatList,
  Image,
  Modal,
  TouchableHighlight,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const Search = () => {
  const navigation = useNavigation();
  const [searchText, setSearchText] = useState('');
  const [searchType, setSearchType] = useState('multi');
  const [searchResults, setSearchResults] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState('');

  const handleSearch = async () => {
    if (searchText.trim() === '') {
      Alert.alert('Error', 'Please enter a search query');
      return;
    }
    try {
      const apiKey = '6ba70868b202348160a217f883410b1a'; // Replace with your TMDB API key
      let apiUrl = '';
      if (searchType === 'multi') {
        apiUrl = `https://api.themoviedb.org/3/search/multi?api_key=${apiKey}&query=${searchText}`;
      } else if (searchType === 'movie') {
        apiUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${searchText}`;
      } else if (searchType === 'tvshow') {
        apiUrl = `https://api.themoviedb.org/3/search/tv?api_key=${apiKey}&query=${searchText}`;
      }

      const response = await fetch(apiUrl);
      const data = await response.json();

      if (data.results) {
        const results = data.results.map((result) => ({
          id: result.id,
          type: result.media_type === 'movie' ? 'Movie' : 'TV Show',
          title: result.title || result.name,
          posterPath: result.poster_path,
          releaseDate: result.release_date || result.first_air_date,
          popularity: result.popularity,
        }));

        setSearchResults(results);
      }
    } catch (error) {
      console.error('Error fetching search results:', error);
      Alert.alert('Error', 'Failed to fetch search results');
    }
  };

  const renderSearchResultItem = ({ item }) => (
    <TouchableOpacity
      style={styles.movieItem}
      onPress={() => navigation.navigate('MovieDetails', { movie: item })}
    >
      <Image
        source={{ uri: `https://image.tmdb.org/t/p/w500${item.posterPath}` }}
        style={styles.posterImage}
      />
      <View style={styles.movieDetails}>
        <Text style={styles.movieTitle}>{item.title}</Text>
        <Text style={styles.popularity}>Popularity: {item.popularity}</Text>
        <Text style={styles.releaseDate}>Release Date: {item.releaseDate}</Text>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('SearchDetails', {
              itemId: item.id,
              mediaType: item.type.toLowerCase() || item.type.toLowerCase(), // Pass the media type
            })
          }
          style={styles.moreButton}
        >
          <Text style={styles.moreButtonText}>More Details</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  const handleOptionPress = (value) => {
    setSelectedValue(value);
    setIsDropdownOpen(false);
    setSearchType(value);
  };

  const toggleDropdown = () =>{
    setIsDropdownOpen(!isDropdownOpen);
  }

const options = [
  { label: 'Multi', value: 'multi' },
  { label: 'Movie', value: 'movie' },
  { label: 'TV Show', value: 'tvshow' },
];

return (
  <View style={styles.container}>
    <Text style={styles.heading}>Search Movie/TV Show Name</Text>
    <TextInput
      style={styles.input}
      placeholder="Enter movie/TV show name"
      value={searchText}
      onChangeText={setSearchText}
    />
    <TouchableOpacity style={styles.dropdownContainer} onPress={toggleDropdown}>
      <Text style={styles.dropdownButtonText}>{selectedValue || 'Select an option'}</Text>
      <Ionicons name="chevron-down" size={20} color="#000" style={styles.dropdownArrowIcon} />
    </TouchableOpacity>
    <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
      <Text style={styles.searchButtonText}>Search</Text>
    </TouchableOpacity>
    <FlatList
      data={searchResults}
      renderItem={renderSearchResultItem}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={styles.searchResultsContainer}
      ListEmptyComponent={<Text style={{ textAlign: 'center', marginTop: 150, fontSize: 16 }}>Please initiate a search</Text>}
    />

    <Modal
      visible={isDropdownOpen}
      transparent
      animationType="slide"
      onRequestClose={() => setIsDropdownOpen(false)}
    >
      <TouchableOpacity
        style={styles.dropdownModal}
        onPress={toggleDropdown}
      >
        <View style={styles.dropdownOptions}>
          {options.map((option) => (
            <TouchableHighlight
              key={option.value}
              underlayColor="#DDDDDD"
              onPress={() => handleOptionPress(option.value)}
            >
              <Text style={styles.optionText}>{option.label}</Text>
            </TouchableHighlight>
          ))}
        </View>
      </TouchableOpacity>
    </Modal>
  </View>
);
}


const styles = StyleSheet.create({
container: {
  flex: 1,
  padding: 16,
},
heading: {
  fontSize: 20,
  fontWeight: 'bold',
  textAlign: 'center',
  marginBottom: 10,
},
input: {
  borderWidth: 1,
  borderColor: '#ccc',
  borderRadius: 4,
  padding: 10,
  marginBottom: 10,
},
dropdownContainer: {
  width: 360,
  borderWidth: 1,
  borderColor: '#ccc',
  // borderRadius: 8,
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: 10,
  marginBottom:10
},
dropdownButtonText: {
  fontSize: 16,
  marginRight: 10,
},
dropdownArrowIcon: {
  marginRight: 5,
},
searchButton: {
  backgroundColor: 'blue',
  padding: 10,
  borderRadius: 4,
  alignItems: 'center',
  marginBottom: 10,
},
searchButtonText: {
  color: 'white',
  fontWeight: 'bold',
},
searchResultsContainer: {
  flexGrow: 1,
},
movieItem: {
  flexDirection: 'row',
  marginBottom: 10,
},
posterImage: {
  width: 100,
  height: 150,
  marginRight: 10,
},
movieDetails: {
  flex: 1,
},
movieTitle: {
  fontSize: 18,
  fontWeight: 'bold',
  marginBottom: 5,
},
popularity:
{
  fontSize: 14,
  marginBottom: 5,
},
releaseDate: {
  fontSize: 14,
  marginBottom: 5,
},
moreButton: {
  backgroundColor: 'blue',
  padding: 8,
  borderRadius: 4,
  alignItems: 'center',
  marginTop: 10,
},
moreButtonText: {
  color: 'white',
  fontWeight: 'bold',
},
dropdownModal: {
  flex: 1,
  justifyContent: 'flex-end',
  alignItems: 'center',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
},
dropdownOptions: {
  width: 400,
  backgroundColor: '#fff',
  borderRadius: 8,
  padding: 10,
},
optionText: {
  fontSize: 16,
  paddingVertical: 8,
},
});

export default Search;
