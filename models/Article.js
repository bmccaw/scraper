const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ArticleSchema = new Schema({
    headline: {
        type: String,
        required: true
      },
      // `link` is required and of type String
      article_link: {
        type: String,
        required: true
      },
      img_link: {
        type: String
      },
      teaser: {
          type: String,
          required:true
      },
      note: [{
        type: Schema.Types.ObjectId,
        ref: "Note"
      }]
});

const Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;
