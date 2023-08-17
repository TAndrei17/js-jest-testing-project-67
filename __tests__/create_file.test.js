import os from 'os';
import path from 'path';
import fs from 'fs/promises';
import { existsSync, readFileSync } from 'fs';
import { beforeEach, expect } from '@jest/globals';
import _ from 'lodash';

import createFileHtml from '../src/create_file.js';

const exampleHtml = `<!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="utf-8">
      <title>Programming courses Hexlet</title>
      <link rel="stylesheet" media="all" href="/assets/application.css" />
    </head>
    <body>
      <h3>
        <a href="/professions/nodejs">Node.js-programmer</a>
      </h3>
      <script src="https://js.stripe.com/v3/"></script>
    </body>
  </html>`;

const tmpFilePath = path.join(os.tmpdir(), 'tmp.html');
const unknownDir = '/unknown/directoty';

// delete virtual file before every test;
beforeEach(async () => {
  // fsPromises.unlink
  await fs.unlink(tmpFilePath).catch(_.noop);
});

test('write file', async () => {
  await createFileHtml(tmpFilePath, exampleHtml);
  // fs.existsSync - other module
  const fileExists = existsSync(tmpFilePath);
  expect(fileExists).toBe(true);

  // fs.readFileSync - other module
  const checkContent = readFileSync(tmpFilePath, 'utf-8');
  expect(checkContent).toBe(exampleHtml);
});

test('wrong path', async () => {
  await createFileHtml(unknownDir, exampleHtml);
  // fs.existsSync - other module
  const fileNoExists = existsSync(unknownDir);
  expect(fileNoExists).toBe(false);
});
