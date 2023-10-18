const apiUrl = 'http://localhost:3001/breweries'; 

fetch(apiUrl)
  .then((response) => response.json())
  .then((data) => {
    console.log(data); 
  })
  .catch((error) => {
    console.error('Error:', error);
  });

