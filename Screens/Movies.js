import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  StyleSheet,
  ActivityIndicator,
  Modal,
  TouchableHighlight,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const Movies = () => {
  const navigation = useNavigation();
  const [selectedCategory, setSelectedCategory] = useState();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const categories = ['Now Playing', 'Popular', 'Top Rated', 'Upcoming'];
  const moviesPerPage = 10;

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleOptionPress = async (category) => {
    setSelectedCategory(category);
    toggleDropdown();
    setLoading(true);
    await fetchMovies(category, 1); // Set the page to 1 when the category changes
    setLoading(false);
  };

  const fetchMovies = async (category, page = 1) => {
    const updatedCategory =
      category === 'Now Playing'
        ? 'now_playing'
        : category === 'Top Rated'
        ? 'top_rated'
        : category;
    const apiKey = '6ba70868b202348160a217f883410b1a';
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${updatedCategory.toLowerCase()}?api_key=${apiKey}&language=en-US&page=${page}&per_page=${moviesPerPage}`
    );
    if (response.ok) {
      const data = await response.json();
      setMovies(data.results);
      setCurrentPage(data.page);
      setTotalPages(data.total_pages);
    } else {
      console.error('Error fetching movies:', response.status);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      const prevPage = currentPage - 1;
      fetchMovies(selectedCategory, prevPage);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      const nextPage = currentPage + 1;
      fetchMovies(selectedCategory, nextPage);
    }
  };

  useEffect(() => {
    fetchMovies('Popular');
    setSelectedCategory('Popular');
  }, []);

  const renderMovieItem = ({ item }) => {
    const handleMoreDetails = () => {
      navigation.navigate('MovieDetails', { movieId: item.id });
    };
    return (
      <TouchableOpacity
        style={styles.movieItem}
        onPress={() => navigation.navigate('MovieDetails', { movie: item })}
      >
        <Image
          source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
          style={styles.posterImage}
        />
        <View style={styles.movieDetails}>
          <Text style={styles.movieTitle}>{item.title}</Text>
          <Text style={styles.popularity}>Popularity: {item.popularity}</Text>
          <Text style={styles.releaseDate}>
            Release Date: {item.release_date}
          </Text>
          <TouchableOpacity
            style={styles.moreButton}
            onPress={handleMoreDetails}
          >
            <Text style={styles.moreButtonText}>More Details</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
      );
    };
    return (
        <View style={styles.container}>
        <TouchableOpacity
             style={styles.dropdownContainer}
             onPress={toggleDropdown}
           >
        <Text style={styles.dropdownButtonText}>
        {selectedCategory || 'Select a category'}
        </Text>
        <Ionicons
        name={isDropdownOpen ? 'chevron-up' : 'chevron-down'}
        size={20}
        color="#000"
        style={styles.dropdownArrowIcon}
        />
        </TouchableOpacity>
        {loading ? (
    <View style={styles.loaderContainer}>
      <ActivityIndicator size="large" color="blue" />
      <Text style={styles.loaderText}>Loading...</Text>
    </View>
  ) : (
    <>
      <FlatList
        data={movies.slice(0, 10)}
        renderItem={renderMovieItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.movieList}
      />
      <View style={styles.paginationContainer}>
        <TouchableOpacity
          style={styles.paginationButton}
          onPress={handlePrevPage}
          disabled={currentPage === 1}
        >
          <Text
            style={[
              styles.paginationButtonText,
              currentPage === 1 && styles.paginationButtonDisabledText,
            ]}
          >
            Previous
          </Text>
        </TouchableOpacity>
        <Text style={styles.currentPageText}>Page {currentPage}</Text>
        <TouchableOpacity
          style={styles.paginationButton}
          onPress={handleNextPage}
          disabled={currentPage === totalPages}
        >
          <Text
            style={[
              styles.paginationButtonText,
              currentPage === totalPages &&
                styles.paginationButtonDisabledText,
            ]}
          >
            Next
          </Text>
        </TouchableOpacity>
      </View>
    </>
  )}

  <Modal
    visible={isDropdownOpen}
    transparent
    animationType="slide"
    onRequestClose={toggleDropdown}
  >
    <TouchableOpacity
      style={styles.dropdownModal}
      onPress={toggleDropdown}
    >
      <View style={styles.dropdownOptions}>
        {categories.map((category) => (
          <TouchableHighlight
            key={category}
            underlayColor="teal"
            onPress={() => handleOptionPress(category)}
          >
            <Text style={styles.optionText}>{category}</Text>
          </TouchableHighlight>
        ))}
      </View>
    </TouchableOpacity>
  </Modal>
</View>
);
};
const styles = StyleSheet.create({
    container: {
    flex: 1,
    paddingTop: 10,
    },
    dropdownContainer: {
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    },
    dropdownButtonText: {
    fontSize: 16,
    marginRight: 10,
    },
    dropdownArrowIcon: {
    marginRight: 5,
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
    movieList: {
    paddingHorizontal: 16,
    paddingTop: 10,
    },
    movieItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    },
    posterImage: {
    width: 80,
    height: 120,
    resizeMode:'cover',
    borderRadius: 4,
    },
    movieDetails: {
    flex: 1,
    marginLeft: 10,
    },
    movieTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    },
    popularity: {
    fontSize: 14,
    marginBottom: 5,
    },
    releaseDate: {
    fontSize: 14,
    marginBottom: 5,
    },
    moreButton: {
    backgroundColor: 'blue',
    padding: 5,
    borderRadius: 4,
    },
    moreButtonText: {
    color: 'white',
    fontWeight: 'bold',
    },
    loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    },
    loaderText: {
    marginTop: 10,
    },
    paginationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    },
    paginationButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: 'blue',
    borderRadius: 4,
    marginHorizontal: 5,
    },
    paginationButtonText: {
    color: 'white',
    fontWeight: 'bold',
    },
    paginationButtonDisabledText: {
    opacity: 0.5,
    },
    currentPageText: {
    fontWeight: 'bold',
    fontSize: 16,
    },
    });
    
    export default Movies;
  