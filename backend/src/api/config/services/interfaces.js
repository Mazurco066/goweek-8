const { commandsEntry, queriesEntry } = require('../../../interfaces')
const { storeDeveloper } = require('../../../interfaces/commands')
const { getDeveloper } = require('../../../interfaces/queries')

module.exports = (repositories) => {
	const { developerRepository } = repositories.repositories
	//const { consultaCliente } = repositories.consultas

	const _commands = {
		storeDeveloper: storeDeveloper(developerRepository)
	}

	const _queries = {
		getDeveloper: getDeveloper(developerRepository)
	}

	const _commandsEntry = commandsEntry(_commands)
	const _queriesEntry = queriesEntry(_queries)

	return {
		commandsEntry: _commandsEntry,
		queriesEntry: _queriesEntry
	}
}
