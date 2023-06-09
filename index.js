// Librairie
const express = require('express')
const logger = require('morgan')

// Création de l'app
const app = express()
const port = 3001

// Plugins
app.use(logger('dev'))

// Body Parsers
app.use(express.urlencoded({ extended: true }))
app.use(express.json())


// Route racine
app.get('/', (req, res) => {
    res.send('Bonjour! vous etes dans votre blog')
})

// Routers
app.use('/articles', require('./routes/articles'))
app.use('/commentaires', require('./routes/commentaires'))
app.use('/tags', require('./routes/tags'))
app.use('/articleTag', require('./routes/articleTag'))


// Démarrage du serveur
app.listen(port, () => {
    console.log(`API listening on port ${port}`)
})