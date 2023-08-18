import { fileURLToPath } from 'url';
import os from 'os';
import path from 'path';
import fs from 'fs/promises';
// import _ from 'lodash';

import getLinksImagines from '../src/get_links_imagines.js';

// 'get links of imagines'
const url = 'https://ru.hexlet.io/courses';

// changeHTML
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const createPath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const tmpDirPath = path.join(os.tmpdir(), 'before.html');
const tmpDirPath2 = path.join(os.tmpdir(), 'before_no_img.html');

beforeEach(async () => {
  await fs.copyFile(createPath('before.html'), tmpDirPath);
  await fs.copyFile(createPath('before_no_img.html'), tmpDirPath2);
});

test('changeHTML', async () => {
  await getLinksImagines(tmpDirPath, url, 'tmp');
  const updatedHtml = await fs.readFile(tmpDirPath, 'utf-8');
  // Cheerio can disrupt indentation and encoding after modifying an HTML file
  const result = updatedHtml.replace(/\s+/g, '');
  const controlHTML = await fs.readFile(createPath('after.html'), 'utf-8');
  // Cheerio can disrupt indentation and encoding after modifying an HTML file
  const controlResult = controlHTML.replace(/\s+/g, '');
  expect(result).toEqual(controlResult);
});

test('get links of imagines', async () => {
  const linkImagine = await getLinksImagines(tmpDirPath, url, 'tmp');
  expect(linkImagine).toEqual([
    'https://ru.hexlet.io/courses/assets/professions/nodejs.png',
    'https://ru.hexlet.io/courses/assets1/professions1/nodejs.png',
  ]);
});

test('no links of imagines', async () => {
  const noLinkImagine = await getLinksImagines(tmpDirPath2, url, 'tmp');
  expect(noLinkImagine).toEqual([]);
});
