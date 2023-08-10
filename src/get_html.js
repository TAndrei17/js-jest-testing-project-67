// import axios from 'axios';
// client - for testing;

const getHtml = async (url, client) => {
  const { data } = await client.get(url);
  return data;
};

export default getHtml;
