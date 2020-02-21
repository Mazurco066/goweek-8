const { baseResponse } = require('../../../lib/util')

module.exports = (connection) => ({
	// Method to get developer from mongo
	list: async function () {
        const a = await connection.collection('Developers').find({}).sort({'name': 1}).toArray()
        if (a.length > 0) {
            const l = a.map(i => ({
                id: i.id,
                name: i.name,
                user: i.user,
                bio: i.bio,
                avatar: i.avatar
            }))
            return baseResponse(200, 'developers list recovered', {}, {list: l})
        }
        return baseResponse(404, 'no developers found')
	}
})