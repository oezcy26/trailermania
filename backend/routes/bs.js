const puppeteer = require('puppeteer');

module.exports = function (app) {

    app.post('/api/getserieurl', async (req, res) =>{
        let url = req.body.url
        page = await getBrowserPage(url)

        let x = await page.evaluate(()=>{
            let hrefs = []
            let aTags = document.querySelectorAll('table.episodes a[title=vivo]')
            aTags.forEach((e)=>{
               hrefs.push("https://bs.to/" + e.getAttribute('href'))
            })

            return hrefs;
        })

  
        console.log(x);

        res.json(x)
    })

}