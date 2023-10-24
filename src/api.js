const apiUrl = 'https://pub-crawl-backend-g8ks.onrender.com/breweries'; 

fetch(apiUrl)
  .then((response) => response.json())
  .then((data) => {
    console.log(data); 
  })
  .catch((error) => {
    console.error('Error:', error);
  });

