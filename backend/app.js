// Dependencies
const express = require('express')
const { compose, then } = require('ramda')
const { connection } = require('./src/lib/mongo')
const { controller } = require('./src/api')
const { mongoConnection, interfaces, repositories } = require('./src/api/config/services')
const { middlewares, router } = require('./src/api/config/app')

// App inicialization
const initApp = async () => {
	// Generating app services
	const createServices = async (connection) => {
		const _c = compose(then(controller), then(interfaces), then(repositories), mongoConnection)
		const _controller = await _c(connection)
		return _controller
	}

	// Configuring app with middlewares, controller and router
	const configApp = (controller) => {
		const createApp = () => express()
		const configureMiddlewares = (app) => middlewares(app)
		const configureRouter = router(controller)
		const _c = compose(configureRouter, configureMiddlewares, createApp)
		const _app = _c()
		return _app
	}
	
	// Generating express app
	const generateApp = compose(then(configApp), createServices)
	const _app = await generateApp(connection)
	return _app
}

// Exporting App
module.exports = initApp
