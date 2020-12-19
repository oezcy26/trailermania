const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://filmpalast.to/search/genre/Abenteuer');
    await page.screenshot({ path: 'example.png' });

    let articles = await page.$$('article cite a')
    console.log(articles.length);

    console.log(articles[0]);
 


     // console.log(results.length);
 
/* 
    let articles = await page.$$()
    console.log(articles.length);

    articles.forEach(async (article)=>{
        let hi = await article.getProperty("href")
        console.log(hi);
    }) */


    //let articles = await page.$("article")
   // console.log(articles);

    await browser.close();
})();