
const { io } = require('./index');
const clientMQTT = require('./mqtt_config');
const User_Device = require('./models/add_device');

async function getMsg(){
    var topicSplit;
    var messageJson;

    await clientMQTT.on('message', async function (topic, message) {
        console.log(topic + ': ' + message.toString());
        topicSplit = topic.split("/");
        messageJson = JSON.parse(message);
        
        if (topicSplit[1] == 'response'){
            User_Device.updateMany({deviceSerial: topicSplit[0]}, { online: messageJson.online, status: messageJson.status}, function (error) {
                if (error) return handleError(error);
            });

            io.emit('response', {
                "deviceSerial": topicSplit[0],
                "online": messageJson.online,
                "status": messageJson.status 
            });
        }       

    });
}

getMsg();