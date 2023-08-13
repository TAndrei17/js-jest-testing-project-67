import { test, expect } from '@jest/globals';
import createName from '../src/create_name.js';

const url = 'https://ru.hexlet.io/courses';
const url500 = 'https://ru.hexlet.io/courses500';

test('create file name', () => {
  expect(createName(url, 'html')).toEqual('ru-hexlet-io-courses.html');
  expect(createName(url500, 'html')).toEqual('ru-hexlet-io-courses500.html');
  expect(createName(url, 'files')).toEqual('ru-hexlet-io-courses_files');
  expect(createName(url500, 'files')).toEqual('ru-hexlet-io-courses500_files');
  expect(createName('')).toEqual('');
});
