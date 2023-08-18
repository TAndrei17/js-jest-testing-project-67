#!/usr/bin/env node
/* eslint-disable consistent-return */

import path from 'path';
import { URL, fileURLToPath } from 'url';
import fs from 'fs';
import axios from 'axios';
import { program } from 'commander';

import getHtml from '../src/get_html.js';
import createName from '../src/create_name.js';
import createFileHtml from '../src/create_file.js';
import getLinksImagines from '../src/get_links_imagines.js';
import saveImagine from '../src/save_imagine.js';

const __filename = fileURLToPath(import.meta.url);
// '__dirname' is current module (bin/page-loader.js)
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');
const createPath = (filename, directory = '') => path.join(projectRoot, directory, filename);

const saveHtml = async (url, directory) => {
  const fileName = createName(url, 'html');
  const filepath = createPath(fileName, directory);
  const context = await getHtml(url.href, axios);
  const result = await createFileHtml(filepath, context);
  // creates html file in directory and returns { filepath };
  return result;
};

const pageLoader = async (url, directory) => {
  // get HTML from URL
  const myURL = new URL(url);
  const html = await saveHtml(myURL, directory);
  const { filepath } = html;
  // const htmlText = readFileSync(filepath, 'utf-8');

  // create directory for to save assets
  const dirImaginesName = createName(myURL, 'files');
  const dirImaginesPath = path.join(projectRoot, dirImaginesName);
  await fs.mkdir(dirImaginesPath, (err) => {
    if (err) {
      return console.error(err);
    }
    console.log('Directory created successfully!');
  });

  // get array of urls-imagines for axios-client
  // change html file
  const urlsImagines = await getLinksImagines(filepath, url, dirImaginesPath);

  // save imagines to directory
  urlsImagines.forEach(async (urlImagine) => {
    const urlObj = new URL(urlImagine);
    // path to directory including image.extension
    const imaginePath = path.join(dirImaginesPath, createName(urlObj));
    await saveImagine(urlObj, axios, imaginePath);
  });

  // html is { filepath }, not file.html;
  return html;
};

program
  .name('Page Loader')
  .description('Get HTML from URL and save to file')
  .version('1.0.0', '-v, --version', 'output the version number')
  .option('-o, --output <directory>', 'output directory path')
  .arguments('<url>')
  .action((url, option) => {
    pageLoader(url, option.output);
  })
  .parse(process.argv);

export default pageLoader;
