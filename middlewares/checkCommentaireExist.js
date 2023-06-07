const Commentaires = require('../models/Commentaires')

module.exports = async function (req, res, next) {
    const commentaires = await Commentaires.find(req.params.id);
    

    if (!commentaires)
        res.status(404).json('Ce commentaires n\'existe pas')
    else {
        req.session = { commentaires: commentaires }
        next()
    }
}