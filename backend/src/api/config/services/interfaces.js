const { commandsEntry, queriesEntry } = require('../../../interfaces')
const { dislikeDeveloper, likeDeveloper, storeDeveloper } = require('../../../interfaces/commands')
const { getDeveloper, listDevelopers } = require('../../../interfaces/queries')

module.exports = (repositories) => {
	// Repositories, Queries and Services
	const { developerRepository } = repositories.repositories
	const { developerQuery } = repositories.queries
	const { userSearch } = repositories.services

	// Commands list
	const _commands = {
		dislikeDeveloper: dislikeDeveloper(developerRepository),
		likeDeveloper: likeDeveloper(developerRepository),
		storeDeveloper: storeDeveloper(developerRepository, userSearch)
	}

	// Queries list
	const _queries = {
		getDeveloper: getDeveloper(developerRepository),
		listDevelopers: listDevelopers(developerRepository, developerQuery)
	}

	// Injecting commands and queries
	const _commandsEntry = commandsEntry(_commands)
	const _queriesEntry = queriesEntry(_queries)

	// Entries with injected commands/queries
	return {
		commandsEntry: _commandsEntry,
		queriesEntry: _queriesEntry
	}
}
