import getLinkImagine from '../src/get_link_imagine.js';

const exampleHtml1 = (
  `<html lang="ru">
    <head>
      <meta charset="utf-8">
      <title>Курсы по программированию Хекслет</title>
    </head>
    <body>
      <img src="/assets/professions/nodejs.png" alt="Иконка профессии Node.js-программист" />
      <img src="/assets1/professions1/nodejs.png" alt="Иконка профессии Node.js-программист" />
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

test('get links of imagines', async () => {
  const linkImagine = getLinkImagine(exampleHtml1);
  const noLinkImagine = getLinkImagine(exampleHtml2);
  expect(linkImagine).toEqual(['/assets/professions/nodejs.png', '/assets1/professions1/nodejs.png']);
  expect(noLinkImagine).toEqual([]);
});
