const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://filmpalast.to/search/genre/Abenteuer');
    await page.screenshot({ path: 'example.png' });

    let movies = await page.evaluate(() => {
        let results = [];
        let items = document.querySelectorAll('article cite a');
        items.forEach((item) => {
            results.push({
                url:  item.getAttribute('href'),
                text: item.getAttribute('title'),
            });
        });
        return results;
    })   

    console.log(movies[0]);

    

    await browser.close();
})();