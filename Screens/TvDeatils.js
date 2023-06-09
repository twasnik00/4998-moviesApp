import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ActivityIndicator } from 'react-native';

const TvDetails = ({ route }) => {
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    fetchMovieDetails();
  }, []);

  const fetchMovieDetails = async () => {
    const { movieId } = route.params;

    // Fetch movie details using the movieId
    const apiKey = '6ba70868b202348160a217f883410b1a'; // Replace with your TMDB API key
    const response = await fetch(`https://api.themoviedb.org/3/tv/${movieId}?api_key=${apiKey}&language=en-US`);

    if (response.ok) {
      const data = await response.json();
      setMovie(data);
    } else {
      console.error('Error fetching movie details:', response.status);
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
        <Text style={styles.movieTitle}>{movie.name}</Text>
        <Text style={styles.popularity}>Popularity: {movie.popularity}</Text>
        <Text style={styles.releaseDate}>Release Date: {movie.first_air_date}</Text>
        <Text style={styles.overview}>Overview: {movie.overview || "Not Available"}</Text>
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

export default TvDetails;