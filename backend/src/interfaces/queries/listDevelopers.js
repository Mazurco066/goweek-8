const { proccessing, baseResponse } = require('../../lib/util')

module.exports = (developerQuery) => ({
	// Running list developers query
	run: async function (parameter) {
		const p = proccessing(this.listDevelopers)
		const r = await p(parameter)
		return baseResponse(r.status.code, r.status.message, {}, { data: r.developersReturn })
	},

	// Retrieving developers list from mongo
	listDevelopers: async function(data) {
        const r = await developerQuery.list()
		return baseResponse(r.status.code, r.status.message, data, { 
			developersReturn: r.list ? r.list : []
		})
	}
})
