import { test, expect } from '@jest/globals';
import createFileName from '../src/get_name.js';

test('create file name', () => {
  expect(createFileName('https://ru.hexlet.io/courses')).toEqual('ru-hexlet-io-courses.html');
  expect(createFileName('https://ru.hexlet.io/courses500')).toEqual('ru-hexlet-io-courses500.html');
  expect(createFileName('')).toEqual('');
});
