// Define the API endpoint URL
const apiUrl = 'https://pub-crawl-backend-g8ks.onrender.com/breweries';

// Perform an HTTP GET request to the API endpoint
fetch(apiUrl)
  .then((response) => response.json()) // Convert the response to JSON format
  .then((data) => {
    console.log(data); // Log the retrieved data to the console
  })
  .catch((error) => {
    console.error('Error:', error); // Log an error message if the request fails
  });

