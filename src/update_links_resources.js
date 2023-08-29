import { URL } from 'url';
import path from 'path';
import { readFileSync } from 'fs';
import fs from 'fs/promises';
import * as cheerio from 'cheerio';
import createName from './create_name.js';

const prepareLink = (link, url) => {
  const urlObj = new URL(url);
  let href;
  if (link.startsWith('http')) {
    href = link;
  } else if (urlObj.pathname === link) {
    href = `${urlObj.origin}${link}`;
  } else {
    href = `${urlObj.href}${link}`;
  }
  return href;
};

const updateLinksResources = async (filepath, url, directory) => {
  // save here all srces and links from html-document
  const linksForClient = [];

  // url-string from CL to object URL
  const getCIUrl = new URL(url);
  const htmlText = readFileSync(filepath, 'utf-8');
  const $ = cheerio.load(htmlText);

  // get all <link> and update attribute 'href'
  const allLinks = $('link');
  if (allLinks.length > 0) {
    allLinks.each((index, element) => {
      const getAttrHref = $(element).attr('href');
      const createLink = prepareLink(getAttrHref, url);
      const createUrl = new URL(createLink);
      const isOneHost = getCIUrl.hostname === createUrl.hostname;
      if (isOneHost) {
        linksForClient.push(createLink);
      }
      const isOneHref = getCIUrl.href === createUrl.href;
      const name = isOneHref ? createName(new URL(getAttrHref, createUrl.origin), 'html') : createName(new URL(getAttrHref, createUrl.origin));
      const updatedLink = isOneHost ? path.join(directory, name) : createLink;
      $(element).attr('href', updatedLink);
    });
  }

  // get all <img> and update attribute 'src'
  const allImgs = $('img');
  if (allImgs.length > 0) {
    allImgs.each((index, element) => {
      const getAttrSrc = $(element).attr('src');
      const createLink = prepareLink(getAttrSrc, url);
      const createUrl = new URL(createLink);
      const isOneHost = getCIUrl.hostname === createUrl.hostname;
      if (isOneHost) {
        linksForClient.push(createLink);
      }
      const createPath = path.join(directory, createName(new URL(getAttrSrc, createUrl.origin)));
      const updatedLink = isOneHost ? createPath : createLink;
      $(element).attr('src', updatedLink);
    });
  }

  // get all <script> and update attribute 'src'
  const allScrypts = $('script');
  if (allScrypts.length > 0) {
    allScrypts.each((index, element) => {
      const getAttrSrc = $(element).attr('src');
      const createLink = prepareLink(getAttrSrc, url);
      const createUrl = new URL(createLink);
      const isOneHost = getCIUrl.hostname === createUrl.hostname;
      if (isOneHost) {
        linksForClient.push(createLink);
      }
      const updatedLink = isOneHost ? path.join(directory, createName(createUrl)) : createLink;
      $(element).attr('src', updatedLink);
    });
  }

  const modifiedHtml = $.html();

  // update first html-file
  await fs.writeFile(filepath, modifiedHtml, 'utf-8');
  return linksForClient;
};

export default updateLinksResources;
