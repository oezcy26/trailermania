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
    //console.log(embedUrlArray)



    /*  var embedUrl
   try {
       await page.goto(youtubeUrl)   
       embedUrl = await page.evaluate(()=>{
          // let results = []
           let title = document.querySelector('#video-title')
           let href = title.getAttribute('href')
           //let embedUrl = href.split("=")[1]
           return href
       })  
       console.log(embedUrl);       
       movie.youtubeUrl = embedUrl;
   } catch (error) {

       console.log(error)
   } */
    //console.log(embedUrl);



    await browser.close();
    res.json(movies)

})

// TODO
app.use('/', express.static(path.join(__dirname, 'vue')))



/* ************* 
***** STARTER *****
****************/

app.listen(PORT, () => console.log("Listening on port " + PORT)) 
