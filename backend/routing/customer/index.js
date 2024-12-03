const changeInfo = require('./changeInfo');
const orderList = require('./order');
const Password = require('./password');

function route(app){
    app.use('/Info', changeInfo);
    app.use('/order', orderList);
    app.use('/password', Password);
}

module.exports = route;