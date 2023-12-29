const fetchDataFromAPI = async () => {
  try {
    const JSONBIN_API_KEY = 'tu_clave_de_api'; // Reemplaza con tu clave de API
    const response = await fetch('https://api.jsonbin.io/v3/b/658ee01f266cfc3fde6ff58a/latest', {
      headers: {
        'X-Master-Key': "$2a$10$GF.kyelyQOUspc7OD9BxleTNlJ02uxvx5RI/ks.Ni./6jelYiGahS",
        'X-ACCESS-KEY': "$2a$10$lefvLSvygOssyPa6txdMKu/UakKiR/cHAzzD/u8IpHnSWveL3Te4y",
      },
    });
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }

    const data = await response.json();
    console.log("data", data.record.classes);
    return data.record.classes || []; // Ajusta la obtención de los datos según la estructura de tu contenedor en JSONBin
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
};

export default fetchDataFromAPI;
