const { developer } = require('../../models')
const { proccessing, baseResponse } = require('../../lib/util')

module.exports = (developerRepository) => ({
	run: async function (parameter) {
		const p = proccessing(this.validateParameter, this.generateDeveloper, this.storeDeveloper)
		const r = await p(parameter)

		return baseResponse(r.status.code, r.status.message)
	},
	validateParameter: function (data) {
		if (!data || typeof data.developerData === 'undefined')
			return baseResponse(400, 'invalid parameter: {developerData: Object}', data )

		return baseResponse (200, 'valid parameter.', data)
	},
	generateDeveloper: function (data) {
		const developerData = developer.criar(data.developerData)
		if (developerData.data)
			return baseResponse(200, 'created developer.', data, {developer: developerData.data})

		return baseResponse(400, 'inconsistent data', data, {}, developerData.errors)
	},
	storeDeveloper: async function(data) {
		const r = await developerRepository.store(data.developer)
		return baseResponse(r.status.code, r.status.message, data)
	}
})
