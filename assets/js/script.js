// Movie Recommendation Script
document.addEventListener('DOMContentLoaded', () => {
  // Select DOM elements
  const movieInput = document.getElementById('movie-input');
  const recommendationDisplay = document.getElementById('recommendation-display');
  const recommendButton = document.getElementById('recommend-button');

  // Fetch the recommendations JSON file
  async function loadRecommendations() {
    try {
      const response = await fetch('/recommendations.json');
      return await response.json();
    } catch (error) {
      console.error('Error loading recommendations:', error);
      return [];
    }
  }

  // Find recommendation for a given movie
  async function findRecommendation(inputMovie) {
    const recommendations = await loadRecommendations();
    const recommendation = recommendations.find(
      rec => rec["Input Movie"].toLowerCase() === inputMovie.toLowerCase()
    );
    return recommendation ? recommendation["Recommended Movie"] : null;
  }

  // Handle recommendation search
  async function handleRecommendation() {
    const movieName = movieInput.value.trim();
    if (!movieName) {
      recommendationDisplay.textContent = 'Please enter a movie name.';
      return;
    }

    const recommendedMovie = await findRecommendation(movieName);
    
    if (recommendedMovie) {
      recommendationDisplay.textContent = `Recommended movie: ${recommendedMovie}`;
      recommendationDisplay.style.color = 'green';
    } else {
      recommendationDisplay.textContent = 'This movie is not in our database. Please try another one.';
      recommendationDisplay.style.color = 'red';
    }
  }

  // Add event listeners
  recommendButton.addEventListener('click', handleRecommendation);
  movieInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      handleRecommendation();
    }
  });
});
