const bookRouter = require('./book')
const stockRouter = require('./stock')
const orderRouter = require('./order')
const deliveryRouter = require('./delivery')
const discount = require('./discount')
const dashboard = require('./dashboard')
const loginRouter = require('./login')

function requireLogin(req, res, next) {
    if (req.cookies.ID) {
        next();
    }

    else res.redirect('/seller/login')
}


function route(app) {
    app.use('/seller/login', loginRouter)
    app.use('/seller/product', requireLogin, bookRouter)
    app.use('/seller/stock', requireLogin, stockRouter)
    app.use('/seller/order', requireLogin, orderRouter)
    app.use('/seller/delivery_fee', requireLogin, deliveryRouter)
    app.use('/seller/discount', requireLogin, discount)
    app.use('/seller/dashboard', requireLogin, dashboard)
}

module.exports = route;