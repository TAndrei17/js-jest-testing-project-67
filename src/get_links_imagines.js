import { URL } from 'url';
import path from 'path';
import { readFileSync } from 'fs';
import fs from 'fs/promises';
import * as cheerio from 'cheerio';
import createName from './create_name.js';

const getLinksImagines = async (filepath, url, directory) => {
  const htmlText = readFileSync(filepath, 'utf-8');
  const $ = cheerio.load(htmlText);
  const linksImagines = [];
  $('img').toArray().forEach((img) => {
    // get url for array (for axios-client);
    const src = $(img).attr('src');
    const linkToImagine = `${url}/${src}`;
    linksImagines.push(linkToImagine);

    // change <img src="> in file
    const urlObj = new URL(linkToImagine);
    const pathToImagine = path.join(directory, createName(urlObj));
    $(img).attr('src', pathToImagine);
  });
  const modifiedHtml = $.html();

  await fs.writeFile(filepath, modifiedHtml, 'utf-8');
  return linksImagines;
};

export default getLinksImagines;
