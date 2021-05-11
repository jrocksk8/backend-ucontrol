'use strict'

const User_Device = require('./models/add_device');
const { io } = require('./index');
const verifyJWT = require('./middlewares/verifyJWT');

io.on('connection', client => {

    const [isValid, id] = verifyJWT(client.handshake.headers['x-access-token']);

    if(!isValid) {
        console.log('Cient not authorized');
        return client.disconnect();
    } 
    console.log('client Connected!');
    console.log('client Authenticated: ' + id);

    client.on('disconnect', () => {
        console.log('client disconnected!');
    });

    client.on('command', (payload) => {
         User_Device.updateMany({deviceSerial: payload.deviceSerial}, {status: payload.status}, function (error) {
            if (error) return handleError(error);
        });
        console.log(payload);

        io.emit('response', {
            "deviceSerial": payload.deviceSerial,
            "online": payload.online,
            "status": payload.status, 
        });
    });

});
