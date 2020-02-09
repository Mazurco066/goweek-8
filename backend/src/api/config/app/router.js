// Dependencies
const pj = require('../../../../package.json')
const { baseResponse } = require('../../../lib/util')

/**
 * Module for express routing.
 * @param {controller} controller - api controller.
 * @param {express} app - express app.
 * @returns {express} express app with configured routes.
 */
module.exports = controller => app => {
    // Version path
    app.get('/', (_, res) => res.status(200).json(baseResponse(200, `Tindev backend version: ${pj.version}`)))
    
    // Returning app with configures routes
    return app
}
