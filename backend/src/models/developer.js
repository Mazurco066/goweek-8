const uuid = require("uuid/v4")
const { generateField, immutable, validation } = require('../lib/util')
const { compose, pipe, replace, toUpper, trim } = require('ramda')

module.exports = {
	create: function (developerData) {
		if (!developerData)
			return { data: null, errors: ['invalid developerData'] }

		const createObject = (developerData) => {
			return [
				generateField('id', developerData.id, null, uuid(), ''),
				generateField('name', developerData.name, compose(toUpper), ''),
				generateField('user', developerData.user, compose(trim), ''),
				generateField('bio', developerData.bio, compose(trim), ''),
				generateField('avatar', developerData.avatar, compose(trim), '')
			].reduce((ac, at) => ac = { ...ac, ...at }, {})
		}

		const validateFields = (developerData, errors) => {
			const d = developerData || {}
			return pipe(
				validation.validateUUID(d.id, 'developer id is not a valid UUID', true),
				validation.validateName(d.name, 'developer name is not valid', true),
				validation.validateUsername(d.username, 'developer username is not valid', true),
			)(errors)
		}

		const data = createObject(developerData)
		const errors = validateFields(data, [])

		return { data: (errors.length > 0 ? null : immutable(data)), errors }
	},
	update: function (developer, changes) {
		return this.criar({ ...developer, ...changes })
	}
}
