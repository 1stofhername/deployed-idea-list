const API_URLS = {
    development: 'http://localhost:8888/.netlify/functions',
    testing: 'https://idealist-app.netlify.app/.netlify/functions',
    production: 'https://idealist-app.netlify.app/.netlify/functions',
  };

  const stage = process.env.STAGE || 'development';
  export const API_URL = API_URLS[stage];