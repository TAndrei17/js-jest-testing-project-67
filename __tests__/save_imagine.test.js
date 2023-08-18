import os from 'os';
import path from 'path';
import { URL } from 'url';
import nock from 'nock';
import axios from 'axios';

import saveImagine from '../src/save_imagine.js';
import createName from '../src/create_name.js';

const urlLink = 'https://github.com/TAndrei17/cv_Andrei_Trunkin/Avatar_AT.jpeg';
const url = new URL(urlLink);
const fileName = createName(url);
const tmpFilePath = path.join(os.tmpdir(), fileName);

nock.disableNetConnect();
test('Check the request', async () => {
  const scope = nock('https://github.com')
    .get('/TAndrei17/cv_Andrei_Trunkin/Avatar_AT.jpeg')
    .replyWithFile(200, tmpFilePath, { 'Content-Type': 'image/jpeg' });

  await saveImagine(url, axios, tmpFilePath);
  expect(scope.isDone()).toBe(true);
});
