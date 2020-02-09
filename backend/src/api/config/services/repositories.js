const { developerRepository } = require('../../../services/repositories/mongo')
// const { consultaCliente } = require('../../../servicos/consultas/mongo')

module.exports = (connection) => {

    const _developerRepository = developerRepository(connection)
    //const _consultaCliente = consultaCliente(connection)

    return {
        repositories: {
            repositorioCliente: _developerRepository
        },
        queries: {}
    }
}
