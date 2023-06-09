import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ActivityIndicator } from 'react-native';

const SearchDetails = ({ route }) => {
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    fetchItemDetails();
  }, []);

  const fetchItemDetails = async () => {
    const { itemId, mediaType } = route.params;
    try {
      const apiKey = '6ba70868b202348160a217f883410b1a'; // Replace with your TMDB API key
      let apiUrl = '';

      if (mediaType === 'movie') {
        apiUrl = `https://api.themoviedb.org/3/movie/${itemId}?api_key=${apiKey}`;
      } else if (mediaType === 'tv show') {
        apiUrl = `https://api.themoviedb.org/3/tv/${itemId}?api_key=${apiKey}`;
      }

      const response = await fetch(apiUrl);
      const data = await response.json();

      setMovie(data);
    } catch (error) {
      console.error('Error fetching item details:', error);
    }
  };

  if (!movie) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="blue" />
        <Text style={styles.loaderText}>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image source={{ uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` }} style={styles.posterImage} />
      <View style={styles.movieDetails}>
        <Text style={styles.movieTitle}>{movie.title}</Text>
        <Text style={styles.popularity}>Popularity: {movie.popularity}</Text>
        <Text style={styles.releaseDate}>Release Date: {movie.release_date}</Text>
        <Text style={styles.overview}>{movie.overview}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loaderText: {
    marginTop: 10,
  },
  posterImage: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
    borderRadius: 4,
    marginBottom: 16,
  },
  movieDetails: {
    marginBottom: 16,
  },
  movieTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  popularity: {
    fontSize: 16,
    marginBottom: 8,
  },
  releaseDate: {
    fontSize: 16,
    marginBottom: 8,
  },
  overview: {
    fontSize: 16,
    lineHeight: 24,
  },
});

export default SearchDetails;
