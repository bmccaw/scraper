const axios = require("axios");
const cheerio = require("cheerio");
const db = require("../models/index.js");

module.exports = function(app) {
app.get("/", async (req,res) => {
    const data = await db.Article.find({});
    console.log(data);
    res.render("index", {article:data});
});

app.get("/scrape", (req, res) => {
    axios.get("https://www.npr.org/sections/news/").then(response => {

        const $ = cheerio.load(response.data);

        const results = [];

        $("article.item").each(function (i, element) {

            const headline = $(element).find("h2").text();
            const articleLink = $(element).find("a").attr("href");
            const imgLink = $(element).find("img").attr("src");
            const teaser = $(element).find(".item-info").children("p").text();

            results.push({
                headline: headline,
                articleLink: articleLink,
                imgLink: imgLink,
                teaser: teaser
            });
            // console.log(results);

            db.Article.create({
                headline : headline,
                article_link: articleLink,
                img_link: imgLink,
                teaser: teaser
            }, function(err, inserted) {
                if (err) {
                    console.log(err);
                } else {
                    console.log(inserted);
                }
            }
            );

        });
        res.redirect("/");
    });
    app.get("/api", async (req,res) => {
        const data = await db.Article.find();
        console.log(data);
     });
});
};