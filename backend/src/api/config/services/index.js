// Inner modules
const mongoConnection = require('./mongoConnection')
const interfaces = require('./interfaces')
const repositories = require('./repositories')
const { setupWebsocket, sendMessage, findConnections } = require('./websocket')

// Exports
module.exports = {
    mongoConnection,
    interfaces,
    repositories,
    setupWebsocket,
    sendMessage,
    findConnections
}
