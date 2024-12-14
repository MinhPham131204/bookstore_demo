const loginRouter = require('./login')
const bookRouter = require('./book')
const orderRouter = require('./order')
const cartRouter = require('./cart')
const resetPass = require('./password')
const changeInfo = require('./changeInfo')

function requireLogin(req, res, next) {
    if (req.cookies.userID) {
        next();
    }

    else res.redirect('/login')
}

function route(app) {

    app.use('/login', loginRouter)
    app.use('/main-page', requireLogin, bookRouter)
    app.use('/order', requireLogin, orderRouter)
    app.use('/cart', requireLogin, cartRouter)
    app.use('/forgotPassword', resetPass);
    app.use('/info', requireLogin, changeInfo)
}

module.exports = route;