const axios = require("axios");
const cheerio = require("cheerio");
const db = require("../models/index.js");

module.exports = function (app) {

    app.get("/", async (req, res) => {
        const data = await db.Article.find({});
        console.log(data);
        res.render("index", { article: data });
    });

    app.get("/scrape", (req, res) => {
        axios.get("https://www.npr.org/sections/news/").then(response => {

            const $ = cheerio.load(response.data);

            const results = [];

            $("article.item").each( (i, element) => {

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
                    headline: headline,
                    article_link: articleLink,
                    img_link: imgLink,
                    teaser: teaser
                },  (err, inserted) => {
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

    });
    //Route for displaying data in JSON
    app.get("/api", async (req, res) => {
        const data = await db.Article.find();
        console.log(data);
        res.json(data);
    });
    //Route for clearing all articles from the db
    app.delete("/", async (req, res) => {
        await db.Article.deleteMany();
        res.redirect("/");
    });

    //Route to view all saved articles
    app.get("/saved", async (req, res) => {
        const data = await db.Article.find({saved:true});
        res.render("index", { article: data });
    });
    //Change save state
    app.put("/:id", async (req,res) => {
        const id = req.params.id;
        const {saved: savedState} = await db.Article.findById(id);
        await db.Article.findOneAndUpdate({_id:id},{saved:!savedState});
        res.end();
    });

};