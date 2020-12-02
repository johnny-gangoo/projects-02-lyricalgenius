let config = require("../config.js");
const accountSid = config.twilio.accountSid;
const authToken = config.twilio.authToken;
const fromSMS = config.twilio.fromSMS;
const fromWA = config.twilio.fromWA;
const client = require('twilio')(accountSid, authToken);

// Send text sms
function sendSMS(number, messages){
    let messageStatus = [];
    messages.forEach(message =>{
        client.messages
        .create({
            body: message,
            from: fromSMS,
            to: '+1' + number
        })
        .then(response => {
            console.log("Success phone")
            messageStatus.push(true);
        })
        .catch(error => {
            console.log("Fail phone")
            messageStatus.push(false);
        })
    });
    return messageStatus;
}


//Send text whatsapp
function sendWA(number, messages){
    let messageStatus = [];
    messages.forEach(message =>{
        client.messages
        .create({
            from: fromWA,
            body: message,
            to: 'whatsapp:+1' + number
        })
        .then(response => {
            messageStatus.push(true);
        })
        .catch(error => {
            messageStatus.push(false);
        });
    });
    return messageStatus;
}

module.exports = { sendSMS, sendWA };