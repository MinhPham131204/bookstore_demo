const bookRouter = require('./book')
const stockRouter = require('./stock')
const orderRouter = require('./order')
const deliveryRouter = require('./delivery')
const discount = require('./discount')
const dashboard = require('./dashboard')

function route(app) {
    app.use('/product', bookRouter)
    app.use('/stock', stockRouter)
    app.use('/order', orderRouter)
    app.use('/delivery_fee', deliveryRouter)
    app.use('/discount', discount)
    app.use('/dashboard', dashboard)
}

module.exports = route;