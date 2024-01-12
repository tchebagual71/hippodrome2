import axios from 'axios';

export const fetchYoutubeVideo = async (songName) => {
  const API_KEY = 'AIzaSyDAsFCFgVsrkF7SNC5OGhfDA7UpTJg5JfI';  
  const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(songName)}&type=video&key=${API_KEY}`;

  try {
    const response = await axios.get(url);
    const videoId = response.data.items[0].id.videoId;
    return videoId;
  } catch (error) {
    console.error('Error fetching YouTube video:', error);
    return null;
  }
};

export const loadYoutubePlayer = (videoId, containerId) => {
  const script = document.createElement('script');
  script.src = 'https://www.youtube.com/iframe_api';
  document.body.appendChild(script);

  script.onload = () => {
    new YT.Player(containerId, {
      videoId: videoId,
      playerVars: {
        'autoplay': 0,
        'controls': 1,
      },
    });
  };
};