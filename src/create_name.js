const mapping = {
  html: () => '.html',
  files: () => '_files',
  pathname: '',
  filename: '',
};

const getFileName = (string) => {
  const pathnameToArray = string.split('/');
  const lastPartArray = pathnameToArray[pathnameToArray.length - 1];
  const isFile = lastPartArray.includes('.');
  if (isFile) {
    mapping.pathname = pathnameToArray.filter((item) => item !== lastPartArray).join('/');
    mapping.filename = lastPartArray;
    return lastPartArray;
  }
  return '';
};

const createName = (url, ending = '') => {
  const { hostname, pathname } = url;
  if (url === '') {
    return '';
  }
  const fileName = getFileName(pathname);

  const changeHostname = hostname.replace(/[^a-zA-Z0-9]/g, '-');
  let changePathname = pathname.replace(/[^a-zA-Z0-9]/g, '-');

  if (fileName !== '') {
    changePathname = mapping.pathname.replace(/[^a-zA-Z0-9]/g, '-');
    return `${changeHostname}${changePathname}-${mapping.filename}`;
  }

  return `${changeHostname}${changePathname}${mapping[ending]()}`;
};

export default createName;
