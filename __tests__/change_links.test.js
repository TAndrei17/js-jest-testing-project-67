import { fileURLToPath } from 'url';
import os from 'os';
import path from 'path';
import fs from 'fs/promises';
import changeImgLinks from '../src/change_links.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const createPath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const tmpFilePath = path.join(os.tmpdir(), 'tmp.html');

beforeEach(async () => {
  await fs.copyFile(createPath('before.html'), tmpFilePath);
});

test('changeHTML', async () => {
  await changeImgLinks(tmpFilePath); // функция меняет файл, не нужно сохранять в константу!
  const result = await fs.readFile(tmpFilePath, 'utf-8');
  const controlHTML = await fs.readFile(createPath('after.html'), 'utf-8');
  expect(result).toEqual(controlHTML);
});
