const { developerRepository } = require('../../../services/repositories/mongo')
const { developerQuery } = require('../../../services/queries/mongo')
const { userSearch } = require('../../../services/userSearch/github')

module.exports = (connection) => {

    // Repositories
    const _developerRepository = developerRepository(connection)
    
    // Queries
    const _developerQuery = developerQuery(connection)

    // Services
    const _userSearch = userSearch()

    // Returning repositores, queries and services
    return {
        repositories: {
            developerRepository: _developerRepository
        },
        queries: {
            developerQuery: _developerQuery
        },
        services: {
            userSearch: _userSearch
        }
    }
}
