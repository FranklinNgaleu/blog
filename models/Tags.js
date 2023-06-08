const db = require('../databases/db')

class Tags{
    static #table_name = 'tags';

    constructor(data) {
        this.id = data.id || null
        this.nom = data.nom || null
    }

    static all() {
        return new Promise((resolve, reject) => {
            const tags = []
            db.each('SELECT * FROM tags', (err, row) => {
                if (err)
                    reject(err)

                tags.push(new Tags(row))
            }, (err) => {
                resolve(tags)
            })
        })
    }

    static find(id) {
        return new Promise((resolve, reject) => {
            db.get('SELECT * FROM tags WHERE id = ?', id, (err, row) => {
                if (err)
                    reject(err)

                const tag = (row) ? new Tags(row) : null
                resolve(tag)
            })
        })
    }

    create() {
        return new Promise((resolve, reject) => {
            db.run("INSERT INTO tags(nom) \
                VALUES(?)", [this.nom], (err) => {
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
            db.run("UPDATE tags SET nom = ? WHERE id = ?", [data.nom, this.id], async (err) => {
                if (err) {
                    console.error(err)
                    reject(err)
                }

                const tag = Tags.find(this.id)

                resolve(tag)
            })
        })
    }
    delete() {
        return new Promise((resolve, reject) => {
            db.run("DELETE FROM tags WHERE id = ?", [this.id], (err) => {
                if (err) {
                    console.error(err)
                    reject(err)
                }

                const tag = Tags.find(this.id)
                if (!tag)
                    reject('Erreur')

                resolve()
            })
        })
    }



    toJSON() {
        return {
            id: this.id,
            name: this.nom,
        }
    }

}
module.exports = Tags