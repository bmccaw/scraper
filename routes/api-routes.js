
const axios = require("axios");
const cheerio = require("cheerio");

axios.get("https://www.npr.org/sections/news/").then(function(response) {
    
    const $ = cheerio.load(response.data);

    const results = [];

    $("article.item").each(function(i, element) {

        let headline = $(element).find("h2").text();
        let articleLink = $(element).find("a").attr("href");
        let imglink = $(element).find("img").attr("src");
        let teaser = $(element).find(".item-info").children("p").text();

        results.push({
            headline: headline,
            articleLink : articleLink,
            imglink : imglink,
            teaser : teaser
        });
        console.log(teaser);

    })
})