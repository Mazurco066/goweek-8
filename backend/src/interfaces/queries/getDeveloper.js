const { proccessing, baseResponse } = require('../../lib/util')

module.exports = (developerRepository) => ({
	run: async function (parameter) {
		const p = proccessing(this.validateParameter, this.getDeveloper)
		const r = await p(parameter)
		return baseResponse(r.status.code, r.status.message, {}, { data: r.developerReturn })
	},
	validateParameter: function (data) {
		if (!data || typeof data.developerData === 'undefined')
			return baseResponse(400, 'invalid parameters: {developerData: Object}', data )

		return baseResponse (200, 'valid parameter.', data)
	},
	getDeveloper: async function(data) {
        const r = await developerRepository.obter(data.developerData)
		return baseResponse(r.status.code, r.status.message, data, { 
			developerReturn: r.developerReturn ? r.developerReturn.data : null
		})
	}
})
