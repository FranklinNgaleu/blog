const db = require('../databases/db');

class ArticleTag {
    static #table_name = 'article_tag';

    constructor(data) {
        this.article_id = data.article_id || null
        this.tag_id = data.tag_id || null
    }

    static allForArticle(article_id) {
        return new Promise((resolve, reject) => {
            const article_tag = []
            db.each('SELECT * FROM tags JOIN article_tag ON article_tag.tag_id = tag_id WHERE article_tag.article_id = ?', article_id, (err, row) => {
                if (err)
                    reject(err)

                article_tag.push(new ArticleTag(row))
            }, (err) => {
                if(err)
                    reject(err)

                
                resolve(article_tag)
            })
        })
    }

    create() {
        return new Promise((resolve, reject) => {
            db.run("INSERT INTO article_tag(article_id, tag_id) \
                VALUES(?, ?)", [this.article_id, this.tag_id], (err) => {
                if (err) {
                    console.error(err)
                    reject(err)
                }

                resolve()
            })
        })
    }

}
module.exports = ArticleTag