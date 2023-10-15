const apiUrl = 'http://localhost:3001/breweries'; // Update the URL to match your local JSON Server's endpoint

fetch(apiUrl)
  .then((response) => response.json())
  .then((data) => {
    // Process the data here
    console.log(data); // You can replace this with your data handling logic
  })
  .catch((error) => {
    console.error('Error:', error);
  });

