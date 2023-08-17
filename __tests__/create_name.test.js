import { URL } from 'url';
import { test, expect } from '@jest/globals';
import createName from '../src/create_name.js';

const url = new URL('https://ru.hexlet.io/courses');
const url500 = new URL('https://ru.hexlet.io/courses500');
const src = new URL('/assets/professions/nodejs.png', 'https://ru.hexlet.io');

test('create file name', () => {
  expect(createName(url, 'html')).toEqual('ru-hexlet-io-courses.html');
  expect(createName(url500, 'html')).toEqual('ru-hexlet-io-courses500.html');
  expect(createName(url, 'files')).toEqual('ru-hexlet-io-courses_files');
  expect(createName(url500, 'files')).toEqual('ru-hexlet-io-courses500_files');
  expect(createName(src)).toEqual('ru-hexlet-io-assets-professions-nodejs.png');
  expect(createName('')).toEqual('');
});
