import * as cheerio from 'cheerio';

// здесь ошибка - путь формируется неверно
const getLinksImagines = (html, url) => {
  const $ = cheerio.load(html);
  const linksImagines = [];
  $('img').toArray().forEach((img) => {
    const src = $(img).attr('src');
    const linkToImagine = `${url}/${src}`;
    linksImagines.push(linkToImagine);
  });
  return linksImagines;
};

export default getLinksImagines;
