const rentController = require('../controllers/rent.controller')


module.exports = function(app) {
app.post('/torent', rentController.bookOnRent)
}