const express = require('express')
const path = require('path');

const app = express()

//process.env.NODE_ENV is null in production -> set it to 3000 in development
//in dev: server must startet npm run dev -> "dev"-Skript in package.json
const PORT = 3000

app.use(express.json())
const puppeteer = require('puppeteer');




/* ************* 
*******API *****
****************/

app.post('/api/sendurl', async (req, res) => {
    let data = req.body;
    console.log(data);

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(data.url);

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
    res.json(movies)
	
})

// TODO
app.use('/', express.static(path.join(__dirname, 'vue')))



/* ************* 
***** STARTER *****
****************/

app.listen(PORT, () => console.log("Listening on port " + PORT)) 
