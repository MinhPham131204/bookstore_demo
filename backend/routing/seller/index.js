const bookRouter = require('./book')
const stockRouter = require('./stock')
const orderRouter = require('./order')
const deliveryRouter = require('./delivery')
const discount = require('./discount')
const dashboard = require('./dashboard')

function route(app) {
    app.use('/seller/product', bookRouter)
    app.use('/seller/stock', stockRouter)
    app.use('/seller/order', orderRouter)
    app.use('/seller/delivery_fee', deliveryRouter)
    app.use('/seller/discount', discount)
    app.use('/seller/dashboard', dashboard)
}

module.exports = route;