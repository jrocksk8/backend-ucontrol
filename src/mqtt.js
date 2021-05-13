
const { io } = require('./index');
const clientMQTT = require('./mqtt_config');
const User_Device = require('./models/add_device');
const Temperature = require('./models/thermostat');

async function getMsg(){
    var topicSplit;
    var messageJson;

    await clientMQTT.on('message', async function (topic, message) {
        console.log(topic + ': ' + message.toString());
        topicSplit = topic.split("/");
        messageJson = JSON.parse(message);
        
        if (topicSplit[1] == 'response'){

            if (messageJson.temp != null){

                const newTemp = new Temperature ({
                    deviceSerial: topicSplit[0],
                    temperature: messageJson.temp,
                    humidity: null
                });
                
                await newTemp.save();
                console.log('Temperature Added Successfully!');
                //console.log(newTemp);  
            }
            
            User_Device.updateMany({deviceSerial: topicSplit[0]}, { online: messageJson.online, status: messageJson.status, tempAverage: messageJson.temp}, function (error) {
                if (error) return handleError(error);
            });

            io.emit('response', {
                "deviceSerial": topicSplit[0],
                "online": messageJson.online,
                "status": messageJson.status,
                "tempAverage": messageJson.temp
            });
        }       

    });
}

getMsg();