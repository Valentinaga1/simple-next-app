const fetchDataFromAPI = async () => {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    console.log("response", response);
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
};

export default fetchDataFromAPI;