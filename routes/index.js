const router = require('express').Router();
const puppeteer = require('puppeteer');

const numOfPages = 4;

const fetchTheNews = async () => {
  let arr = [];
  try {
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();
    for (let i = 1; i < numOfPages + 1; i++) {
      await page.goto(`https://news.ycombinator.com/news?p=${i}`);
      // queries the page and returns an Array of Elements
      const links = await page.$$eval('.storylink', (stories) =>
        stories.map((s) => {
          return { title: s.innerText, link: s.href };
        })
      );
      const votes = await page.$$eval(
        '.subtext',

        (stories) =>
          stories.map((s) => {
            return { votes: s.innerText.split(' ')[0] };
          })
      );
      votes.forEach(({ votes }, index) => {
        if (votes > 99) {
          arr.push({ votes, ...links[index] });
        }
      });
    }
    await browser.close();
    return arr;
  } catch (error) {
    throw new Error(error);
  }
};

router.get('/api/news', async (request, response) => {
  try {
    const news = await fetchTheNews();
    response.json(news);
  } catch (e) {
    response.json(e.message);
  }
});
// END DEMO

module.exports = router;
