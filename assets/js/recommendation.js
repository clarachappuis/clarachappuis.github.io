document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('recommendation-form');
    const resultText = document.getElementById('result-text');

    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        const movieName = document.getElementById('movie-name').value;

        try {
            const response = await fetch('https://backend-repository-tdr3.onrender.com/recommend', { // Replace with your backend URL
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ movie_name: movieName }),
            });

            const data = await response.json();
            if (response.ok) {
                resultText.textContent = `Recommended Movie: ${data.recommendation}`;
            } else {
                resultText.textContent = `Error: ${data.error}`;
            }
        } catch (error) {
            resultText.textContent = 'An error occurred while fetching the recommendation.';
        }
    });
});
