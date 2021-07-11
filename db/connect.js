const mongoose = require('mongoose');

// mongoose.set('debug', true);
mongoose.connect('mongodb://localhost:27017/gmbs', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).catch(error => {
    console.error('DB ERROR:', error);
})

module.exports = mongoose;

