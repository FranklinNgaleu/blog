const db = require('./db')

db.serialize(() => {
    db.run('DROP TABLE articles');
    db.run("CREATE TABLE IF NOT EXISTS articles(   \
        id INTEGER PRIMARY KEY AUTOINCREMENT,   \
        titre VARCAHR(20) NOT NULL,             \
        contenu TEXT NOT NULL,         \
        auteur VARCHAR(10) NOT NULL,     \
        visibilite BOOLEAN,                       \
        created_at DATETIME,                    \
        updated_at DATETIME                      \
    )")
    console.log('Table articles créée')

    db.run('DROP TABLE tags');
    db.run("CREATE TABLE IF NOT EXISTS tags(   \
        id INTEGER PRIMARY KEY AUTOINCREMENT,   \
        nom VARCAHR(50) NOT NULL          \
    )")
    console.log('Table tags créée')

    db.run('DROP TABLE commentaires');
    db.run("CREATE TABLE IF NOT EXISTS commentaires (   \
        id INTEGER PRIMARY KEY AUTOINCREMENT,         \
        contenu TEXT NOT NULL,         \
        auteur VARCHAR(10) NOT NULL,     \
        created_at DATETIME,                    \
        updated_at DATETIME,             \
        article_id INTEGER, \
        FOREIGN KEY (article_id) REFERENCES articles(id)        \
    )")
    console.log('Table commentaire créée')

    db.run('DROP TABLE article_tag');
    db.run("CREATE TABLE IF NOT EXISTS article_tag (    \
      article_id INTEGER,                       \
      tag_id INTEGER,                           \
      FOREIGN KEY (article_id) REFERENCES articles(id), \
      FOREIGN KEY (tag_id) REFERENCES tags(id),     \
      PRIMARY KEY (article_id, tag_id)      \
    )")
    console.log('Table "article_tag" créée');
})

db.close()