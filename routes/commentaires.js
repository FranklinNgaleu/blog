const express = require('express')
const router = express.Router()
const checkCommentaireExist = require('../middlewares/checkCommentaireExist')
const Commentaires = require('../models/Commentaires')


// Récupération de la liste des commentaires
router.route('/index').get(async (req, res) => {
    const result = await Commentaires.all()

    res.send(result)
})

// Récupération d'un commentaire
router.route('/index/:id(\\d+)').get(checkCommentaireExist, async (req, res) => {
    res.json(req.session.commentaires);
    
})

// Récupération de la liste des commentaires d'un article
router.route('/index/article/:article_id(\\d+)').get(async (req, res) => {
    const result = await Commentaires.allForArticle(req.params.article_id)

    res.send(result)
})

// Récupération de la liste des commentaires d'un auteur
router.route('/index/auteur/:auteur').get(async (req, res) => {
    
    const result = await Commentaires.allForAuteur(req.params.auteur)

    res.send(result)
})

// Modifier un commentaire
router.route('/update/:id(\\d+)').put(checkCommentaireExist, async (req, res) => {
    req.session.commentaires = await req.session.commentaires.update(req.body)

    res.json(`Le commentaire ${req.session.commentaires.contenu} à été modifié`)
})

//supprimer un article
router.route('/delete/:id(\\d+)').delete(checkCommentaireExist, async (req, res) => {
    const commentaires = req.session.commentaires

    commentaires.delete()
    .then(() => {
        res.json(`Le commentaire ${commentaires.contenu} à été supprimé`)
    })
    .catch(err => {
        res.status(500).json(`Erreur`)
    })
})

//ajouter un commentaire
router.route('/create').post(async (req, res) => { 
    const new_commentaire = new Commentaires(req.body)
    try {
        await new_commentaire.create()

        res.status(201).json(`Le commentaire ${new_commentaire.contenu} à été ajouté`)
    }
    catch (err) {
        console.error('Erreur dans la route', err)

        res.status(500).json('Erreur serveur, Echec de l\'ajout')
    }
})


module.exports = router