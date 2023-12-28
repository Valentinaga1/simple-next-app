const getAbsoluteURL = (path) => {
  const isServer = typeof window === 'undefined';
  const protocol = isServer ? 'http' : window.location.protocol.replace(':', '');
  const host = isServer ? 'localhost:3000' /* Reemplaza con tu host */ : window.location.host;
  return `${protocol}://${host}${path}`;
};

const fetchDataFromAPI = async () => {
  const apiUrl = getAbsoluteURL('/api/classes');
  console.log("apiUrl", apiUrl);
  try {
    const response = await fetch(apiUrl);
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