const Tags = require('../models/Tags')

module.exports = async function (req, res, next) {
    const tags = await Tags.find(req.params.id);

    if (!tags)
        res.status(404).json('Ce tag n\'existe pas')
    else {
        req.session = { tags: tags }
        next()
    }
}