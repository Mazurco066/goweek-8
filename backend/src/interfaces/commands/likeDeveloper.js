const { developer } = require('../../models')
const { proccessing, baseResponse } = require('../../lib/util')

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
            if (currentDev.likes.includes(targetDev.id)) {
                return baseResponse(400, 'you already matched this Developer', data)
            }
            const updatedUser = developer.update(currentDev, {
                likes: [ ...currentDev.likes, targetDev.id ]
            })
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