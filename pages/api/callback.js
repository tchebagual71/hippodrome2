import axios from 'axios';

export default async function callback(req, res) {
  const { code } = req.query;
  const redirectUri = process.env.NEXT_PUBLIC_REDIRECT_URI || 'https://localhost:3000/api/callback'; // Default to local dev URI
  const clientSecret = '361eb0ed457d4912bbc624dbdbcd1214';
  const clientId = process.env.SPOTIFY_CLIENT_ID;

  const auth = 'Basic ' + Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

  try {
    const response = await axios.post(
      'https://accounts.spotify.com/api/token',
      `grant_type=authorization_code&code=${code}&redirect_uri=${encodeURIComponent(redirectUri)}`,
      {
        headers: {
          Authorization: auth,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );
    res.redirect(`/dashboard?access_token=${response.data.access_token}`);
  } catch (error) {
    res.status(error.response?.status || 500).json(error.response?.data || {});
  }
}