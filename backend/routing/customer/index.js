const changeInfo = require('./changeInfo');


function route(app){
    app.use('/Info', changeInfo);
}

module.exports = route;