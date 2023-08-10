import AxiosFakeClient from '../classes/AxiosFakeClient.js';
import getHtml from '../src/get_html.js';

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

test('get HTML', async () => {
  const client = new AxiosFakeClient({ 'https://fakeUrl/fortesting': exampleHtml });
  const fakeUrl = 'https://fakeUrl/fortesting';
  const html = await getHtml(fakeUrl, client);
  expect(html).toEqual(exampleHtml);
});
