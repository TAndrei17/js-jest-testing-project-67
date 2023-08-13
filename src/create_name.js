const endPath = {
  html: () => '.html',
  files: () => '_files',
};

const createName = (url, ending) => {
  if (url === '') {
    return '';
  }
  const getName = url.split('//');
  const changeSymbols = getName[1].replace(/[^a-zA-Z0-9]/g, '-');
  return `${changeSymbols}${endPath[ending]()}`;
};

export default createName;
