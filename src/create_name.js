const createFileName = (url) => {
  if (url === '') {
    return '';
  }
  const getName = url.split('//');
  const changeSymbols = getName[1].replace(/[^a-zA-Z0-9]/g, '-');
  return `${changeSymbols}.html`;
};

export default createFileName;
