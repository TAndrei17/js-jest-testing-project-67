import fs from 'fs';

const saveAssets = async (url, client, directory) => {
  const { href } = url;
  try {
    const { data } = await client.get(href, { responseType: 'stream' });
    data.pipe(fs.createWriteStream(directory));
    console.log(`The file "${href}" was successfully saved into directory fot assets\n`);
  } catch {
    console.log(`Error. Unable to load the file ${href}\n`);
  }
};

export default saveAssets;
