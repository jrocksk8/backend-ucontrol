var mqtt = require('mqtt');

var id = 'nodejs_client_' + Math.floor(Math.random()*1001);

var options={
    clientId: id,
    username: "device_client",
    password: "Passw0rd_Dev",
    clean: true};

var clientMQTT  = mqtt.connect('mqtt://tutronico.ga', options);

module.exports = clientMQTT;




