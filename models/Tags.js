const db = require('../databases/db')

class tags{

    toJSON() {
        return {
            id: this.id,
            name: this.nom,
        }
    }

}
module.exports = tags