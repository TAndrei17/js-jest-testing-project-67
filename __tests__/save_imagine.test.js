import os from 'os';
import path from 'path';
import { URL } from 'url';
import * as fsp from 'fs/promises';
import fs from 'fs';
import { beforeEach } from '@jest/globals';
import nock from 'nock';
import axios from 'axios';
import _ from 'lodash';

import saveImagine from '../src/save_imagine.js';
import createName from '../src/create_name.js';

const urlLink = 'https://github.com/TAndrei17/cv_Andrei_Trunkin/Avatar_AT.jpeg';
const url = new URL(urlLink);
const fileName = createName(url);
const tmpFilePath = path.join(os.tmpdir(), fileName);

beforeEach(async () => {
  await fsp.unlink(fileName).catch(_.noop);
});

nock.disableNetConnect();
test('get imagine', async () => {
  const scope = nock('https://github.com')
    .get('/TAndrei17/cv_Andrei_Trunkin/Avatar_AT.jpeg')
    .reply(200, tmpFilePath, { 'Content-Type': 'image/jpeg' });

  await saveImagine(url, axios, tmpFilePath);
  const fileExists = fs.existsSync(tmpFilePath);

  expect(scope.isDone()).toBe(true);
  expect(fileExists).toBe(true);
  // нужен тест, чтобы сравнить содержание
});
