const bookRouter = require('./book')
const stockRouter = require('./stock')
const orderRouter = require('./order')
const deliveryRouter = require('./delivery')

function route(app) {
    app.use('/product', bookRouter)
    app.use('/stock', stockRouter)
    app.use('/order', orderRouter)
    app.use('/delivery_fee', deliveryRouter)
}

module.exports = route;