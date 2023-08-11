import fs from 'fs/promises';

const createFileHtml = async (path, context) => {
  await fs.writeFile(path, context, (error) => {
    if (error) {
      throw error('Error');
    }
    console.log('The file has been saved!');
  });
};

export default createFileHtml;
