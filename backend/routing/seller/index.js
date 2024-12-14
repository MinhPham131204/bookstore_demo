const bookRouter = require('./book')
const stockRouter = require('./stock')
const orderRouter = require('./order')
const deliveryRouter = require('./delivery')
const discount = require('./discount')
const dashboard = require('./dashboard')
const loginRouter = require('./login')
const userRouter = require('./user')

// function requireLogin(req, res, next) {
//     if (req.cookies.ID) {
//         next();
//     }

//     else res.redirect('/seller/login')
// }


function route(app) {
    app.use('/seller/login', loginRouter)
    app.use('/seller/product', bookRouter)
    app.use('/seller/stock', stockRouter)
    app.use('/seller/order', orderRouter)
    app.use('/seller/delivery_fee', deliveryRouter)
    app.use('/seller/discount', discount)
    app.use('/seller/dashboard', dashboard)
    app.use('/seller/user', userRouter)
}

module.exports = route;