import fs from 'fs/promises';

const createFileHtml = async (path, context) => {
  try {
    await fs.writeFile(path, context);
    console.log(path);
    return { filepath: path };
  } catch (error) {
    console.error('Failed to save the file. Perhaps the directory does not exist');
    return error;
  }
};

export default createFileHtml;
