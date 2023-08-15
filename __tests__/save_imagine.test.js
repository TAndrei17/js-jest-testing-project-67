import os from 'os';
import path from 'path';
import * as fsp from 'fs/promises';
import fs from 'fs';
import { beforeEach } from '@jest/globals';
import nock from 'nock';
import axios from 'axios';
import _ from 'lodash';

import saveImagine from '../src/save_imagine.js';

const urlLink = 'https://github.com/TAndrei17/cv_Andrei_Trunkin/blob/main/index.html';
const tmpFilePath = path.join(os.tmpdir(), 'tmp.jpeg');

beforeEach(async () => {
  await fsp.unlink('tmp.jpeg').catch(_.noop);
});

nock.disableNetConnect();
test('get imagine', async () => {
  const scope = nock('https://github.com')
    // нужен URL именно к изображению
    .get('/TAndrei17/cv_Andrei_Trunkin/blob/main/index.html')
    .reply(200, tmpFilePath, { 'Content-Type': 'image/jpeg' });

  await saveImagine(urlLink, axios, tmpFilePath);
  const fileExists = fs.existsSync(tmpFilePath);

  expect(scope.isDone()).toBe(true);
  expect(fileExists).toBe(true);
});
