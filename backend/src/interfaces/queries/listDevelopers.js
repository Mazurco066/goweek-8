const { proccessing, baseResponse } = require('../../lib/util')

module.exports = (developerRepository, developerQuery) => ({
	// Running list developers query
	run: async function (parameter) {
		const p = proccessing(
			this.validateParameter,
			this.getCurrentDeveloper,
			this.listDevelopers
		)
		const r = await p(parameter)
		return baseResponse(r.status.code, r.status.message, {}, { data: r.developersReturn })
	},

	// Validating req parameters
	validateParameter: function (data) {
		if (!data || typeof data.developerData === 'undefined' || typeof data.developerData.user === 'undefined')
			return baseResponse(400, 'invalid parameters: {developerData: Object}', data )

		return baseResponse (200, 'valid parameter.', data)
	},

	// Searching current developer on mongo
	getCurrentDeveloper: async function(data) {
		const username = data.developerData.user
        const r = await developerRepository.getByUser({ user: username })
        if (![200, 201].includes(r.status.code))  {
            return baseResponse(400, r.status.message, data)
        }
        return baseResponse(r.status.code, r.status.message, data, {
            currentDeveloper: r.developerReturn ? r.developerReturn.data : null
        })
    },

	// Retrieving developers list from mongo
	listDevelopers: async function(data) {
        const r = await developerQuery.list(data.currentDeveloper)
		return baseResponse(r.status.code, r.status.message, data, { 
			developersReturn: r.list ? r.list : []
		})
	}
})
