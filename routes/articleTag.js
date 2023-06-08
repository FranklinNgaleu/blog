const express = require('express')
const router = express.Router()
const ArticleTag = require('../models/ArticleTag')


//ajouter un article_tag
router.route('/create').post(async (req, res) => { 
    const new_articleTag = new ArticleTag(req.body)
    try {
        await new_articleTag.create()

        res.status(201).json('element ajouté')
    }
    catch (err) {
        console.error('Erreur dans la route', err)

        res.status(500).json('Erreur serveur, Echec du post')
    }
})

module.exports = router
