const mongoose = require('mongoose');

// mongoose.set('debug', true);
// mongodb://symplemarket:C15WkTsIym@mongodb.stage.crawless.com:27017/admin?authSource=spiders&readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false
mongoose.connect('mongodb://localhost:27017/gmbs', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).catch(error => {
    console.error('DB ERROR:', error);
})

module.exports = mongoose;

