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
    
    // Commands paths
    app.post('/developers', async (req, res) => await controller.run('storeDeveloper', req, res))

    // Queries
    app.get('/developers/:id', async (req, res) => await controller.run('getDeveloper', req, res))
    app.get('/developers', async (req, res) => await controller.run('listDevelopers', req, res))

    // Returning app with configures routes
    return app
}
