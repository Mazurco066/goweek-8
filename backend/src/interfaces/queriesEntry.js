const { baseResponse } = require('../../src/lib/util')

module.exports = (queries) => ({
    getQuery: function (queryId) {
        return queries[queryId]
    },
    run: async function (queryId, parameters = {}) {
        const query = this.getQuery(queryId)
        if (!query) return baseResponse(400, `invalid query: ${queryId}`)
        return await query.run(parameters)
    }
})
