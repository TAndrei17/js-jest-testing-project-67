import fs from 'fs';

const saveImagine = async (url, client, directory) => {
  const { href } = url;
  const { data } = await client.get(href, { responseType: 'stream' });
  data.pipe(fs.createWriteStream(directory));
};

export default saveImagine;
