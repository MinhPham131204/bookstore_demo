const loginRouter = require('./login')
const bookRouter = require('./book')
const orderRouter = require('./order')
const cartRouter = require('./cart')
const resetPass = require('./password')

function route(app) {

    app.use('/login', loginRouter)
    app.use('/main-page', bookRouter)
    app.use('/order', orderRouter)
    app.use('/cart', cartRouter)
    app.use('/forgotPassword', resetPass);

    // app.use('/stock', stockRouter)
    // app.use('/order', orderRouter)
    // app.use('/delivery_fee', deliveryRouter)
    // app.use('/discount', discount)
    // app.use('/dashboard', dashboard)
}

module.exports = route;