import getLinksImagines from '../src/get_links_imagines.js';

const exampleHtml1 = (
  `<html lang="ru">
    <head>
      <meta charset="utf-8">
      <title>Курсы по программированию Хекслет</title>
    </head>
    <body>
      <img src="assets/professions/nodejs.png" alt="Иконка профессии Node.js-программист" />
      <img src="assets1/professions1/nodejs.png" alt="Иконка профессии Node.js-программист" />
      <h3>
        <a href="/professions/nodejs">Node.js-программист</a>
      </h3>
    </body>
  </html>`
);

const exampleHtml2 = (
  `<html lang="ru">
    <head>
      <meta charset="utf-8">
      <title>Курсы по программированию Хекслет</title>
    </head>
    <body>
      <h3>
        <a href="/professions/nodejs">Node.js-программист</a>
      </h3>
    </body>
  </html>`
);

const page = 'https://ru.hexlet.io/courses';

test('get links of imagines', async () => {
  const linkImagine = getLinksImagines(exampleHtml1, page);
  const noLinkImagine = getLinksImagines(exampleHtml2, page);
  expect(linkImagine).toEqual([
    'https://ru.hexlet.io/courses/assets/professions/nodejs.png',
    'https://ru.hexlet.io/courses/assets1/professions1/nodejs.png',
  ]);
  expect(noLinkImagine).toEqual([]);
});
