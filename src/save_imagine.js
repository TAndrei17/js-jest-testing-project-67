import fs from 'fs';

const saveImagine = async (url, client, directory) => {
  const { data } = await client.get(url, { responseType: 'stream' });
  data.pipe(fs.createWriteStream(directory));
};

export default saveImagine;
