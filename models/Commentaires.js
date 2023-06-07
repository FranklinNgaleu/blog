const db = require('../databases/db')

class Commentaires {
    static #table_name = 'commentaires';

    constructor(data) {
        this.id = data.id || null
        this.contenu = data.contenu || null
        this.auteur = data.auteur || null
        this.article_id = data.article_id || null
        this.created_at = data.created_at || null
        this.updated_at = data.updated_at || null
    }

    static all() {
        return new Promise((resolve, reject) => {
            const commentaires = []
            db.each('SELECT * FROM commentaires', (err, row) => {
                if (err)
                    reject(err)

                    commentaires.push(new Commentaires(row))
            }, (err) => {
                resolve(commentaires)
            })
        })
    }

    static allForArticle(article_id) {
        return new Promise((resolve, reject) => {
            const commentaires = []
            db.each('SELECT * FROM commentaires WHERE article_id = ?', article_id, (err, row) => {
                if (err)
                    reject(err)

                commentaires.push(new Commentaires(row))
            }, (err) => {
                resolve(commentaires)
            })
        })
    }

    static allForAuteur(auteur) {
        return new Promise((resolve, reject) => {
            const commentaires = []
            db.each('SELECT * FROM commentaires WHERE auteur = ?', auteur,(err, row) => {
                if (err)
                    reject(err)

                    commentaires.push(new Commentaires(row))
            }, (err) => {
                resolve(commentaires)
            })
        })
    }

    static find(id) {
        return new Promise((resolve, reject) => {
            db.get('SELECT * FROM commentaires WHERE id = ?', id, (err, row) => {
                if (err)
                    reject(err)

                const commentaire = (row) ? new Commentaires(row) : null
                resolve(commentaire)
            })
        })
    }

    update(data) {
        return new Promise((resolve, reject) => {
            db.run("UPDATE commentaires SET contenu = ?, auteur = ?, article_id = ?, created_at = ?, updated_at = ? WHERE id = ?", 
            [data.contenu,data.auteur,data.article_id,data.created_at,data.updated_at, this.id], async (err) => {
                if (err) {
                    console.error(err)
                    reject(err)
                }

                const commentaire = Commentaires.find(this.id)

                resolve(commentaire)
            })
        })
    }

    delete() {
        return new Promise((resolve, reject) => {
            db.run("DELETE FROM commentaires WHERE id = ?", [this.id], (err) => {
                if (err) {
                    console.error(err)
                    reject(err)
                }

                const commentaire = Commentaires.find(this.id)
                if (!commentaire)
                    reject('Erreur')

                resolve()
            })
        })
    }

    create() {
        return new Promise((resolve, reject) => {
            db.run("INSERT INTO commentaires(contenu, auteur,article_id,created_at,updated_at) \
                VALUES(?, ? ,? ,?, ?)", [this.contenu, this.auteur,this.article_id,this.created_at,this.updated_at], (err) => {
                if (err) {
                    console.error(err)
                    reject(err)
                }

                resolve()
            })
        })
    }

    toJSON() {
        return {
            id: this.id,
            article_id: this.article_id,
            auteur: this.auteur,
            content: this.contenu,
            created_at: this.created_at,
            last_edit: this.updated_at,
        }
    }

}
module.exports = Commentaires