import axios from 'axios';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

const fetchPlaylists = async (key, accessToken) => {
  const { data } = await axios.get('https://api.spotify.com/v1/me/playlists', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return data;
};

const fetchTracks = async (key, accessToken, playlistId) => {
  const { data } = await axios.get(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return data;
};

export default function Dashboard({ initialData }) {
  const router = useRouter();
  const { access_token: accessToken } = router.query;

  const { data: playlists } = useRouter(['playlists', accessToken], fetchPlaylists, {
    initialData,
    keepPreviousData: true,
  });

  const [selectedPlaylist, setSelectedPlaylist] = useState(null);

  const { data: tracks } = useRouter(
    ['playlistTracks', accessToken, selectedPlaylist],
    fetchTracks,
    {
      enabled: !!selectedPlaylist,
      keepPreviousData: true,
    }
  );

  useEffect(() => {
    if (selectedPlaylist) {
      // You can implement further logic here, such as fetching YouTube videos
    }
  }, [selectedPlaylist]);

  const handleSubmit = () => {
    console.log('Handling Submit');
  };

  return (
    <div>
      <h1>Your Spotify Playlists</h1>
      <select onChange={(e) => setSelectedPlaylist(e.target.value)}>
        {playlist.map((playlist.id) => (
          <option key={playlist.id} value={playlist.id}>
            {playlist.name}
          </option>
        ))}
      </select>
      <button onClick={handleSubmit}>Submit</button>
      {tracks && (
        <div>
          <h2>Tracks in Selected Playlist</h2>
          <ul>
            {tracks.items.map((trackItem) => (
              <li key={trackItem.track.id}>{trackItem.track.name}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export async function getServerSideProps(context) {
  const { query } = context;
  const accessToken = query.access_token;

  const initialData = await fetchPlaylists(null, accessToken);

  return {
    props: {
      initialData,
    },
  };
}