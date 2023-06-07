const db = require('../databases/db');
const Commentaires = require('./Commentaires');

class Articles {
    static #table_name = 'articles';

    constructor(data) {
        this.id = data.id || null
        this.titre = data.titre || null
        this.contenu = data.contenu || null
        this.auteur = data.auteur || null
        this.visibilite = true
        this.created_at = data.created_at || null
        this.updated_at = data.updated_at || null
        this.commentaires = []
        this.tags = []
    
    }

    async get_commentaires() {
        this.commentaires = await Commentaires.allForArticle(this.id)
    }

    static all() {
        return new Promise((resolve, reject) => {
            const articles = []
            db.each('SELECT * FROM articles', (err, row) => {
                if (err)
                    reject(err)

                articles.push(new Articles(row))
            }, (err) => {
                resolve(articles)
            })
        })
    }

    static all2() {
        return new Promise((resolve, reject) => {
            const articles = []
            db.each('SELECT * FROM articles', (err, row) => {
                if (err)
                    reject(err)

                articles.push(new Articles(row))
            }, async (err) => {
                for (const article of articles) {
                    await article.get_commentaires()
                }

                resolve(articles)
            })
        })
    }


    static find(id) {
        return new Promise((resolve, reject) => {
            db.get('SELECT * FROM articles WHERE id = ?', id, (err, row) => {
                if (err)
                    reject(err)

                const article = (row) ? new Articles(row) : null
                resolve(article)
            })
        })
    }

    create() {
        return new Promise((resolve, reject) => {
            db.run("INSERT INTO articles(titre, contenu, auteur, visibilite, created_at, updated_at) \
                VALUES(?, ? ,? ,?, ?, ?)", [this.titre, this.contenu, this.auteur,this.visibilite,this.created_at,this.updated_at], (err) => {
                if (err) {
                    console.error(err)
                    reject(err)
                }

                resolve()
            })
        })
    }

    update(data) {
        return new Promise((resolve, reject) => {
            db.run("UPDATE articles SET titre = ?, contenu = ?, auteur = ?, visibilite = ?, created_at = ?, updated_at = ? WHERE id = ?", 
            [data.titre,data.contenu,data.auteur,this.visibilite,this.created_at,this.updated_at, this.id], async (err) => {
                if (err) {
                    console.error(err)
                    reject(err)
                }

                const article = Articles.find(this.id)

                resolve(article)
            })
        })
    }

    delete() {
        return new Promise((resolve, reject) => {
            db.run("DELETE FROM articles WHERE id = ?", [this.id], (err) => {
                if (err) {
                    console.error(err)
                    reject(err)
                }

                const article = Articles.find(this.id)
                if (!article)
                    reject('Erreur')

                resolve()
            })
        })
    }

    toJSON() {
        return {
            id: this.id,
            title: this.titre,
            created_at: this.created_at,
            last_edit: this.updated_at,
            visible: this.visibilite,
            tags:this.tags,
            commentaries: this.commentaires
        }
    }
    
}
module.exports = Articles