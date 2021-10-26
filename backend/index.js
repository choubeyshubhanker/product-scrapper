const PORT = process.env.PORT || 8000;
const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
var cors = require('cors')

const app = express();

app.use(cors());




app.get('/', (req,res)=>{
    res.json('Port working')
})


app.get('/compare/:product', (req,res)=>{
    const articles = [];
    const product = req.params.product
    

    axios.get(`https://www.google.com/search?q=${product}&tbm=shop`,{
        headers: {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.157 Safari/537.36"
        }
        })
        .then((response)=>{
            const html = response.data
            const $ = cheerio.load(html)

            $("div.KZmu8e", html).each(function () {
                const title = $("div.sh-np__product-title",this).text()
                const price = $("span.T14wmb",this).text()
                const seller = $("span.E5ocAb",this).text()
                const url = $("a.sh-np__click-target",this).attr('href')
                const img = $("img:first",this).attr('src')
                if(url.charAt(0) === "/"){
                    const baseUrl = "https://www.google.com"
                    const newUrl = baseUrl + url

                    articles.push({
                        title,
                        newUrl,
                        img,
                        price,
                        seller
                    })
                }else{
                    const newUrl = url

                    articles.push({
                        title,
                        newUrl,
                        img,
                        price,
                        seller
                    })
                }
                
            })
           res.json(articles)
        }).catch((err)=>console.log(err))
        
})

// app.get('/compare/:product', async (req,res)=>{

// })

app.listen(PORT, ()=> console.log(`server running on port ${PORT}`));