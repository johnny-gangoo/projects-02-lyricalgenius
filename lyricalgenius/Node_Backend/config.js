let config = {};

config.port = 3001;

config.mongoose = {
    url: "mongodb+srv://LyricalGeniusDev:lyricalg3niuspass@cluster0.319vd.mongodb.net/lyricalgeniusdb1?retryWrites=true&w=majority",
    database: "lyricalgeniusdb1",
}

config.twilio = {
    accountSid: 'AC63b06e4639b7e40090487af06a833f2f',
    authToken: '3e8d42292039114ecdc0e7d2d0982a5b',
    fromSMS: '+12055966060',
    fromWA: 'whatsapp:+14155238886',
}

config.gmail = {
    user: 'lyricalgeniusapi@gmail.com',
    pass: '4bWW1uz50vx7',
}

module.exports = config;