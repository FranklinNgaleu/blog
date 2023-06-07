const express = require('express')
const router = express.Router()
const checkArticleExist = require('../middlewares/checkArticleExist')
const Articles = require('../models/Articles')



    // Récupération de la liste des articles
    router.route('/index').get(async (req, res) => {
        const result = await Articles.all2()

        res.send(result)
    })

    // Récupération d'un article
    router.route('/index/:id(\\d+)').get(checkArticleExist, async (req, res) => {
        res.json(req.session.articles);
        
    })

    // Modifier un article
    router.route('/update/:id(\\d+)').put(checkArticleExist, async (req, res) => {
        req.session.articles = await req.session.articles.update(req.body)

        res.json(`L'article ${req.session.articles.titre} à été modifié`)
    })

    //supprimer un article
    router.route('/delete/:id(\\d+)').delete(checkArticleExist, async (req, res) => {
        const articles = req.session.articles

        articles.delete()
        .then(() => {
            res.json(`L'article ${articles.titre} à été supprimé`)
        })
        .catch(err => {
            res.status(500).json(`Erreur`)
        })
    })


    //ajouter un article
    router.route('/create').post(async (req, res) => { 
        const new_article = new Articles(req.body)
        try {
            await new_article.create()

            res.status(201).json(`L'article ${new_article.titre} à été posté`)
        }
        catch (err) {
            console.error('Erreur dans la route', err)

            res.status(500).json('Erreur serveur, Echec de l\'ajout')
        }
    })


module.exports = router