#!/usr/bin/env node

import path from 'path';
import { fileURLToPath } from 'url';
import axios from 'axios';
import { program } from 'commander';

import getHtml from '../src/get_html.js';
import createFileName from '../src/create_name.js';
import createFileHtml from '../src/create_file.js';

const __filename = fileURLToPath(import.meta.url);
// '__dirname' is current module (bin/page-loader.js)
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');
const createPath = (filename, directory = '') => path.join(projectRoot, directory, filename);

const pageLoader = async (url, directory) => {
  const fileName = createFileName(url);
  const filepath = createPath(fileName, directory);
  const context = await getHtml(url, axios);
  const result = await createFileHtml(filepath, context);
  return result;
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
