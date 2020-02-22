// Dependencies
const { baseResponse } = require('../lib/util')

// Mudule tah runs commands and queries
module.exports = (interfaces) => ({
    run: async (methodName, req, res) => {
        const requisition = {
            // POST to store or update developer
            storeDeveloper: async (req) => {
				const { username } = req.body
                const r = await interfaces.commandsEntry.run('storeDeveloper', {
                    developerData: {
                        user: username
                    }
                })
                return r
            },
            // GET to find user by username
            getDeveloper: async (req) => {
                const { id } = req.params
                const r = await interfaces.queriesEntry.run('getDeveloper', {
                    developerData: {
                        user: id
                    }
                })
                return r
            },
            // GET to list all developers
            listDevelopers: async (req) => {
                const { user } = req.headers
                const r = await interfaces.queriesEntry.run('listDevelopers', {
                    developerData: {
                        user: user
                    }
                })
                return r
            },
            // POST to like developer
            likeDeveloper: async (req) => {
                const { id } = req.params
                const { user } = req.headers
                const r = await interfaces.commandsEntry.run('likeDeveloper', {
                    developerData: {
                        user: user,
                        devId: id
                    }
                })
                return r
            },
            // POST to dislike developer
            dislikeDeveloper: async (req) => {
                const { id } = req.params
                const { user } = req.headers
                const r = await interfaces.commandsEntry.run('dislikeDeveloper', {
                    developerData: {
                        user: user,
                        devId: id
                    }
                })
                return r
            }
        }
        // Global error treatment
        try {
            const r = await requisition[methodName](req)
            return res.status(r.status.code).json(baseResponse(
                r.status.code,
                r.status.message,
                { data: r.data }
            ))
        } catch (err) {
            console.error('[ERRO]', '[api.controle.executar]', `[${err.message}]`, err)
			return res.status(500).json(baseResponse(500, 'Ops.. error while using the REST Service.'))
        }
    }

})
