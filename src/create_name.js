const mapping = {
  html: () => '.html',
  files: () => '_files',
  jpg: () => '.jpg',
  jpeg: () => '.jpeg',
};

const createName = (url, ending) => {
  if (url === '') {
    return '';
  }
  const getName = url.split('//');
  const changeSymbols = getName[1].replace(/[^a-zA-Z0-9]/g, '-');
  return `${changeSymbols}${mapping[ending]()}`;
};

export default createName;
