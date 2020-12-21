const express = require('express')
const path = require('path');

const app = express()

//process.env.NODE_ENV is null in production -> set it to 3000 in development
//in dev: server must startet npm run dev -> "dev"-Skript in package.json
const PORT = 3000

app.use(express.json())
const puppeteer = require('puppeteer');

/* ***********
***** COMMON HELPERS *********
******************/

getBrowserPage = async (url) => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);
    return page;
}


/* ************* 
*******API *****
****************/

app.get('/api/genres', async (req, res) => {
    page = await getBrowserPage("https://filmpalast.to/")

    // get genres from site
    let genres = await page.evaluate(() => {
        let liContent = []
        let lis = document.querySelectorAll('section#genre ul li a')

        lis.forEach((li) => {
            liContent.push(li.innerHTML)
        })
        return liContent;
    })

    res.json({
        genres: genres
    })
})

app.get('/api/fetchmovies/:genre', async (req, res) => {
    let genre = req.params.genre;
    console.log(genre);

    page = await getBrowserPage("https://filmpalast.to/")

    movies = await page.evaluate(() => {
        let movies = []
        let aTags = document.querySelectorAll('ul#sliderDla li a:not(.button)')
        aTags.forEach(element => {

            let newElem = {
                title: element.getAttribute('title'),
                url: element.getAttribute('href'),
                //imgSrc: "https://www.filmpalast.to" + bild.getAttribute('src')
            }
            movies.push(newElem)
        });




        return movies;

    })

    console.log(movies);

    res.json(movies)
})

app.post('/api/sendurl', async (req, res) => {
    let data = req.body;
    console.log(data);

    page = await getBrowserPage(data.url);

    // get Movies from a page
    let movies = await page.evaluate(() => {
        let results = [];
        let items = document.querySelectorAll('article');
        items.forEach((item) => {
            let name = item.querySelector('a')
            //let bild = item.querySelector('img.cover-opacity')

            let newElem = {
                title: name.getAttribute('title'),
                url: name.getAttribute('href'),
                //imgSrc: "https://www.filmpalast.to" + bild.getAttribute('src')
            }
            results.push(newElem);
        });
        return results;
    })

    console.log(movies[0]);

    // make Youtube-Search Url's
    movies.forEach((movie) => {
        let nameArray = movie.title.split(" ");
        let youtubeUrl = "https://www.youtube.com/results?search_query=trailer+german"
        nameArray.forEach(part => {
            youtubeUrl = youtubeUrl + "+" + part
            //console.log(youtubeUrl);
        })

        movie.youtubeUrl = youtubeUrl

    })

    // get end of youtube vido url for i-frame
    for (var i = 0; i < movies.length; i++) {
        await page.goto(movies[i].youtubeUrl)
        let href = await page.evaluate(() => {
            // let results = []
            let title = document.querySelector('#video-title')
            let href = title.getAttribute('href')
            let url = href.split("=")[1]
            //let embedUrl = href.split("=")[1]
            return url
        })
        movies[i].iframeUrl = href
    }






    await browser.close();
    res.json(movies)

})

app.post('/api/getvivo', async (req, res) => {
    let url = req.body.detailurl

    //make whole url
    url = "https:" + url;
    console.log(url);

    //open browser with url
    page = await getBrowserPage(url)

    //get vivo-embed-url
    let vivoEmbed = await page.evaluate(() => {
        let result;
        let items = document.querySelectorAll('ul.currentStreamLinks');

        //return items[1].querySelector('p.hostName').innerHTML
        let vivo;
        for (let i = 0; i < items.length; i++) {
            if (items[i].querySelector('p.hostName').innerHTML == "vivo.sx") {
                vivo = items[i].querySelector('a').getAttribute('data-player-url')
            }
        }
        return vivo;
    })



    return res.json({
        vivoEmbed: vivoEmbed
    })


})

// TODO
app.use('/', express.static(path.join(__dirname, 'vue')))



/* ************* 
***** STARTER *****
****************/

app.listen(PORT, () => console.log("Listening on port " + PORT)) 
