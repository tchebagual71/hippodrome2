import axios from 'axios';

export const fetchSpotifyPlaylists = async (accessToken) => {
  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };

  try {
    const response = await axios.get('https://api.spotify.com/v1/me/playlists', config);
    return response.data.items;
  } catch (error) {
    console.error('Error fetching Spotify playlists:', error);
    return [];
  }
};