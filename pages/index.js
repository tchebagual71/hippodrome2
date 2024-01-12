import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();

  const loginWithSpotify = () => {
    router.push('/api/login');
  };

  return (
    <div>
      <button onClick={loginWithSpotify}>Login with Spotify</button>
    </div>
  );
}