
const sslserver = require('./app');
require('./database');
const clientMQTT = require('./mqtt_config');
require('dotenv').config();

function init() {
    //Levantar el servidor Express seguro
    sslserver.listen(process.env.PORT_EXPRESS);
    console.log('Server on Localhost: ' + process.env.PORT_EXPRESS);
    
    //Levantar el servicio de Sockets
    module.exports.io = require('socket.io')(sslserver);
    require('./sockets');

}

async function initMQTT(){
    await clientMQTT.on('connect', function (){
        console.log('EMQX Connected!');
        clientMQTT.subscribe('+/response', function(err){
            if(!err){
                console.log('Subscribe to all response topics!');
            }
        })
    });
}


init();
initMQTT();
require('./mqtt');
