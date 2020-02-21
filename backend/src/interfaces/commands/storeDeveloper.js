const { developer } = require('../../models')
const { proccessing, baseResponse } = require('../../lib/util')

module.exports = (developerRepository, userSearch) => ({
	// Running store developer command
	run: async function (parameter) {
		// Insert user pipeline
		const p = proccessing(
			this.validateParameter,
			this.getDeveloperFromGithub,
			this.generateDeveloper,
			this.storeDeveloper
		)
		const r = await p(parameter)
		
		// Returning success or error 
		return baseResponse(r.status.code, r.status.message)
	},

	// Validating parameters
	validateParameter: function (data) {
		if (
			!data || 
			typeof data.developerData === 'undefined' ||
			typeof data.developerData.user === 'undefined'
		) {
			return baseResponse(400, 'invalid parameter: {developerData: Object}', data )
		}
		return baseResponse (200, 'valid parameter.', data)
	},

	// Searching developer on github
	getDeveloperFromGithub: async function(data) {
		const username = data.developerData.user
		const response = await userSearch.find(username)

		if ([200, 201].includes(response.status.code)) {
			return baseResponse (200, 'Github developer fetched.', data, { 
				developerFromGithub: response.developerReturn 
			})
		} else {
			return baseResponse(500, 'Error while fetching user from github API')
		}
	},

	// Generating a developer object
	generateDeveloper: function (data) {
		const developerData = developer.create(data.developerFromGithub)
		if (developerData.data)
			return baseResponse(200, 'created developer.', data, {developer: developerData.data})

		return baseResponse(400, 'inconsistent data', data, {}, developerData.errors)
	},

	// Storing developer into mongo
	storeDeveloper: async function(data) {
		const r = await developerRepository.store(data.developer)
		return baseResponse(r.status.code, r.status.message, data)
	}
})
