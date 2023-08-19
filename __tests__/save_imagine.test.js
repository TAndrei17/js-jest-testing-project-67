import os from 'os';
import path from 'path';
import { URL } from 'url';
import nock from 'nock';
import axios from 'axios';

import saveImagine from '../src/save_imagine.js';
import createName from '../src/create_name.js';

const urlLink = 'http://www.huvila.net/650/kuvax-9909-650-S-0_iso.jpg';
const url = new URL(urlLink);
const fileName = createName(url);
const tmpFilePath = process.env.GITHUB_ACTIONS_TMP_PATH
  ? path.join(process.env.GITHUB_ACTIONS_TMP_PATH, fileName)
  : path.join(os.tmpdir(), fileName);

nock.disableNetConnect();
test('Check the request', async () => {
  const scope = nock('http://www.huvila.net')
    .get('/650/kuvax-9909-650-S-0_iso.jpg')
    .replyWithFile(200, tmpFilePath, { 'Content-Type': 'image/jpg' });

  await saveImagine(url, axios);
  expect(scope.isDone()).toBe(true);
});
