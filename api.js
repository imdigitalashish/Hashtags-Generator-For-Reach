const express = require('express');
const puppeteer = require('puppeteer');

const app = express();

app.use(express.static('public'));

app.get('/api/tags', async (req, res) => {
  const { query } = req.query;
  const apiUrl = 'https://rapidtags.io/api/generator?query=' + query;

  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto(apiUrl);

    // Wait for the content to load if necessary
    // For example, if the website fetches data dynamically
    // you can use `page.waitForSelector` or `page.waitForTimeout`

    const content = await page.evaluate(() => {
      return JSON.parse(document.querySelector('body').textContent);
    });

    await browser.close();

    res.send(content);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'An error occurred' });
  }
});

app.listen(7070, '0.0.0.0', () => {
  console.log('Server listening on port 3000');
});
