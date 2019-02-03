const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ArticleSchema = new Schema({
    headline: {
        type: String,
        required: true
      },
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
      saved: {
          type: Boolean
      },
      note: [{
        type: Schema.Types.ObjectId,
        ref: "Note"
      }]
});

const Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;
