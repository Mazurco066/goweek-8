// Importing express server
const initApp = require('./app')

// Starting the backend
initApp().then(server => {

    // Server listen
    server.listen(3001, () => {
        console.log('Tindev backend is running on http://localhost:3001')
    })

// Error during inicialization
}).catch(err => {
    console.error('Error while starting the API: ' + err.message)
})

