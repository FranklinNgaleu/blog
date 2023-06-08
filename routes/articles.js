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
        const result = await Articles.find(req.params.id)

        res.send(result)
        
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

    // Modifier un article
    router.route('/update/:id(\\d+)').put(checkArticleExist, async (req, res) => {
        try{
            req.session.articles = await req.session.articles.update(req.body)

            res.json(`L'article ${req.session.articles.titre} à été modifié`)
        }catch(err){
            console.error('erreur')

            res.status(500).json('erreur serveur')
        }
        
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

            res.status(500).json('Erreur serveur, Echec du post')
        }
    })


module.exports = router