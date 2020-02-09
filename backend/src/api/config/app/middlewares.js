// Middlewares
const bodyParser = require('body-parser')
const cors = require('cors')

/**
 * Module to inject middlewares into an express app.
 * @param {express} app - express app.
 * @returns {express} app with injected middlewares.
 */
module.exports = (app) => {
    app.use(cors())
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({ extended: true }))
    return app
}
