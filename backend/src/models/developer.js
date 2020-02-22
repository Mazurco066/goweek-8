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
				generateField('avatar', developerData.avatar, compose(trim), ''),
				generateField('likes', developerData.likes, null, []),
				generateField('dislikes', developerData.dislikes, null, [])
			].reduce((ac, at) => ac = { ...ac, ...at }, {})
		}

		const validateFields = (developerData, errors) => {
			const d = developerData || {}
			return pipe(
				validation.validateUUID(d.id, 'developer id is not a valid UUID', true),
				validation.validateName(d.name, 'developer name is not valid', true),
				validation.validateUsername(d.user, 'developer user is not valid', true),
				validation.validateArray(d.likes, 'developer likes must be array type'),
				validation.validateArray(d.dislikes, 'developer dislikes must be array type')
			)(errors)
		}

		const data = createObject(developerData)
		const errors = validateFields(data, [])

		return { data: (errors.length > 0 ? null : immutable(data)), errors }
	},
	update: function (developer, changes) {
		return this.create({ ...developer, ...changes })
	}
}
