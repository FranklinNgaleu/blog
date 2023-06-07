const Articles = require('../models/Articles')

module.exports = async function (req, res, next) {
    const articles = await Articles.find(req.params.id);

    if (!articles)
        res.status(404).json('Cet article n\'existe pas')
    else {
        req.session = { articles: articles }
        next()
    }
}