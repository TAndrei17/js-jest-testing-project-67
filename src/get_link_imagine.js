import * as cheerio from 'cheerio';

const getLinkImagine = (html) => {
  const $ = cheerio.load(html);
  const linksImages = [];
  $('img').toArray().forEach((img) => {
    const src = $(img).attr('src');
    linksImages.push(src);
  });
  return linksImages;
};

export default getLinkImagine;
