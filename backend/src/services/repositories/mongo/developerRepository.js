const { compose } = require('ramda')
const { developer } = require('../../../models')
const { baseResponse } = require('../../../lib/util')

module.exports = (connection) => ({
	// Method to get developer from mongo
	get: async function (developerData) {
		if (!developerData || typeof developerData.id == 'undefined')
			return baseResponse(400, 'invalid developer data: {id: string}')

		const r = await connection.collection('Developers').findOne({ id: developerData.id })
		if (r)
			return baseResponse(200, 'developer found', {}, {developerReturn: developer.create(r)})

		return baseResponse(404, 'developer not found')
	},

	// Method to get user by id
	getByUser: async function (developerData) {
		if (!developerData || typeof developerData.user == 'undefined')
			return baseResponse(400, 'invalid developer data: {user: string}')

		const r = await connection.collection('Developers').findOne({ user: developerData.user })
		if (r)
			return baseResponse(200, 'developer found', {}, {developerReturn: developer.create(r)})

		return baseResponse(404, 'developer not found')
	},

	// Method to store developer into mongo
	store: async function (developerData) {
		// Validating developer object
		const validateDeveloper = developerData => developer.create(developerData)
		// Aux to insert developer into mongo
		const insertDeveloper = async (developerData) => {
			try {
				await connection.collection('Developers').insertOne({ ...developerData })
				return baseResponse(201, 'developer successfully stored.')
			} catch (err) {
				console.error('[ERROR]','[services.repositories.mongo.developerRepository.store.insertDeveloper]', `[${err.message}]`, err)
				return baseResponse(500, 'internal error while inserting a developer')
			}
		}
		// Aux to update developer on mongo
		const updateDeveloper = async (developerData) => {
			const r = await connection.collection('Developers').updateOne(
				{ id: developerData.id },
				{ $set: {
					name: developerData.name,
					user: developerData.user,
					bio: developerData.bio,
					avatar: developerData.avatar,
				}}
			)
			const code = (r.result.ok != 1 || r.result.nModified < 1 ? 404 : 200)
			const message = (code === 200 ? 'developer successfully updated' : 'no developer information has changed')
			return baseResponse(code, message)
		}
		// Aux to store developer into mongo
		const storeDeveloper = async (developerReturn) => {
			if (developerReturn.data) {
				const r = await this.getByUser(developerReturn.data)
				if (r.status.code != 200 && r.status.code != 404) return r
				return r.status.code === 200
					? await updateDeveloper({ ...developerReturn.data })
					: await insertDeveloper({ ...developerReturn.data })
			} else {
				return baseResponse(400, 'invalid data for developer', {}, {}, developerReturn.errors)
			}
		}
		// Returning the store procedure
		return await compose(storeDeveloper, validateDeveloper)(developerData)
	}
})
