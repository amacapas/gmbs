const db = require('../db/connect');

const linkedinSchema = new db.Schema({
    email: String,
    first_name: String,
    last_name: String,
    position: String,
    business_name: String,
    website: String,
    phone: String,
    street: String,
    zipcode: String,
    state: String,
    city: String,
});

module.exports = db.model('Linkedin', linkedinSchema);