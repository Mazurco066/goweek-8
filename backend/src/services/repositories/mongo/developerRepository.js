const { compose } = require('ramda')
const { developer } = require('../../../models')
const { baseResponse } = require('../../../lib/util')

module.exports = (connection) => ({
	get: async function (developerData) {
		if (!developerData || typeof developerData.id == 'undefined')
			return baseResponse(400, 'invalid developer data: {id: string}')

		const r = await connection.collection('Developers').findOne({ id: developerData.id })
		if (r)
			return baseResponse(200, 'developer found.', {}, {developerReturn: developer.create(r)})

		return baseResponse(404, 'developer not found.')
	},
	store: async function (developerData) {
		const validateDeveloper = developerData => developer.criar(developerData)
		const insertDeveloper = async (developerData) => {
			try {
				await connection.collection('Developers').insertOne({ ...developerData })
				return baseResponse(201, 'developer successfully stored.')
			} catch (err) {
				console.error('[ERROR]','[services.repositories.mongo.developerRepository.store.insertDeveloper]', `[${err.message}]`, err)
				return baseResponse(500, 'internal error while inserting a developer')
			}
		}
		const updateDeveloper = async (developerData) => {
			const r = await connection.collection('Developers').updateOne(
				{ id: developerData.id },
				{
					$set: {
						name: developerData.name,
						user: developerData.user,
						bio: developerData.bio,
						avatar: developerData.avatar,
					}
				}
			)
	
			const code = (r.result.ok != 1 || r.result.nModified < 1 ? 404 : 200)
			const message = (code === 200 ? 'developer successfully updated.' : 'no developer changes.')

			return baseResponse(code, message)
		}
		const storeDeveloper = async (developerReturn) => {
			if (developerReturn.data) {
				const r = await this.obter(developerReturn.data)

				if (r.status.code != 200 && r.status.code != 404) return r

				return r.status.code === 200
					? await updateDeveloper({ ...developerReturn.data })
					: await insertDeveloper({ ...developerReturn.data })
			} else {
				return baseResponse(400, 'invalid data for developer', {}, {}, developerReturn.errors)
			}
		}

		return await compose(storeDeveloper, validateDeveloper)(developerData)
	}
})
