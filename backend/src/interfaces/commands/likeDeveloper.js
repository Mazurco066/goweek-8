const { developer } = require('../../models')
const { proccessing, baseResponse } = require('../../lib/util')
const { findConnections, sendMessage } = require('../../api/config/services/websocket')

module.exports = (developerRepository) => ({
	// Running store developer command
	run: async function (parameter) {
		// Insert user pipeline
		const p = proccessing(
			this.validateParameter,
            this.getCurrentDeveloper,
            this.getTargetDeveloper,
            this.matchDeveloper,
            this.updateDeveloper
		)
		const r = await p(parameter)
		
		// Returning success or error 
		return baseResponse(r.status.code, r.status.message, {}, {
            data: r.updatedUser ? r.updatedUser: null
        })
	},

	// Validating parameters
	validateParameter: function (data) {
		if (
			!data || 
			typeof data.developerData === 'undefined' ||
            typeof data.developerData.user === 'undefined' ||
            typeof data.developerData.devId === 'undefined'
		) {
			return baseResponse(400, 'invalid parameter: {developerData: Object}', data)
		}
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
    
    // Searching target developer on mongo
    getTargetDeveloper: async function(data) {
		const username = data.developerData.devId
        const r = await developerRepository.getByUser({ user: username })
        if (![200, 201].includes(r.status.code))  {
            return baseResponse(400, r.status.message, data)
        }
        return baseResponse(r.status.code, r.status.message, data, {
            targetDeveloper: r.developerReturn ? r.developerReturn.data : null
        })
    },
    
    // Matching developers
    matchDeveloper: async function(data) {
        const currentDev = data.currentDeveloper
        const targetDev = data.targetDeveloper
        if (!currentDev || !targetDev) {
            return baseResponse(404, 'you are trying to like an invalid user', data)
        } else {
            // Already matched user
            if (currentDev.likes.includes(targetDev.id)) {
                return baseResponse(400, 'you already matched this Developer', data)
            }
            // Match between users
            if (targetDev.likes.includes(currentDev.id)) {
                const socket1 = findConnections(currentDev.user)
                const socket2 = findConnections(targetDev.user)
                if (socket1) sendMessage(socket1, 'match', targetDev)
                if (socket2) sendMessage(socket2, 'match', currentDev)
            }
            // Updating user likes
            const updatedUser = developer.update(currentDev, {
                likes: [ ...currentDev.likes, targetDev.id ]
            })
            // Returning...
            return baseResponse(200, 'Developer successfully matched', data, {
                updatedUser: updatedUser.data
            })
        }
    },

    // Updating developer into mongo
    updateDeveloper: async function(data) {
        const r = await developerRepository.store(data.updatedUser)
		return baseResponse(r.status.code, r.status.message, data)
    }
})