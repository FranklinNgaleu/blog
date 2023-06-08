const express = require('express')
const router = express.Router()
const checkTagExist = require('../middlewares/checkTagExist')
const Tags = require('../models/Tags')

    // Récupération de la liste des tags
    router.route('/index').get(async (req, res) => {
        const result = await Tags.all()

        res.send(result)
    })

    // Récupération d'un tag
    router.route('/index/:id(\\d+)').get(checkTagExist, async (req, res) => {
        res.json(req.session.tags);
        
    })

    // Modifier un tag
    router.route('/update/:id(\\d+)').put(checkTagExist, async (req, res) => {
        req.session.tags = await req.session.tags.update(req.body)

        res.json(`Le tag ${req.session.tags.nom} à été modifié`)
    })

    //supprimer un tag
    router.route('/delete/:id(\\d+)').delete(checkTagExist, async (req, res) => {
        const tags = req.session.tags

        tags.delete()
        .then(() => {
            res.json(`Le tag ${tags.nom} à été supprimé`)
        })
        .catch(err => {
            res.status(500).json(`Erreur`)
        })
    })

    //ajouter un tag
    router.route('/create').post(async (req, res) => { 
        const new_tag = new Tags(req.body)
        try {
            await new_tag.create()

            res.status(201).json(`Le tag ${new_tag.nom} à été ajouté`)
        }
        catch (err) {
            console.error('Erreur dans la route', err)

            res.status(500).json('Erreur serveur, Echec de l\'ajout')
        }
    })

module.exports = router