const express = require('express')
const path = require('path');
const puppeteer = require('puppeteer');

const app = express()

//process.env.NODE_ENV is null in production -> set it to 3000 in development
//in dev: server must startet npm run dev -> "dev"-Skript in package.json
const PORT = 3000

app.use(express.json())

// API
require('./routes/filmpalast.js')(app)
require('./routes/bs.js')(app)

//Common Methods
getBrowserPage = async (url) => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);
    return page;
}

app.use('/', express.static(path.join(__dirname, 'vue')))



/* ************* 
***** STARTER *****
****************/

app.listen(PORT, () => console.log("Listening on port " + PORT)) 
