export default function login(req, res) {
  const redirectUri = process.env.NEXT_PUBLIC_REDIRECT_URI || 'http://localhost:3000/api/callback';
  const AUTH_URL = `https://accounts.spotify.com/authorize?client_id=478cceec244c4f16bd2cdfe13a6ca40c&response_type=code&redirect_uri=${encodeURIComponent(redirectUri)}&scope=playlist-read-private`;
  res.redirect(AUTH_URL);
}