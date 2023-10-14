const openBreweryBaseUrl = 'https://api.openbrewerydb.org/v1';

export async function fetchBreweriesByCountry(country) {
  try {
    const response = await fetch(`${openBreweryBaseUrl}/breweries?by_country=${country}`);
    if (!response.ok) {
      throw new Error('Failed to fetch breweries by country');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching breweries by country:', error);
    throw error;
  }
}

