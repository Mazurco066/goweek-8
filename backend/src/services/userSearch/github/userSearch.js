const axios = require('axios')
const { baseResponse } = require('../../../lib/util')
require('dotenv').config()

module.exports = () => ({
    find: async function (username) {
        // Trying to fetch user from github
        const r = await axios.get(process.env.GITHUB_API_URL + `/users/${username}`)
        // Verifying response
        if ([200, 201].includes(r.status)) {
            return baseResponse(200, 'developer fetched.', {}, {
                developerReturn: {
                    user: username,
                    name: r.data.name,
                    bio: r.data.bio,
                    avatar: r.data.avatar_url
                }
            })
        } else {
            return baseResponse(
                r.status, 
                'Erro ao buscar desenvolvedor na API do Github'
            )
        }
    }
})