const db = require('../db/connect');

const leadgenSchema = new db.Schema({
    business: String,
    contact: String,
    email: String,
    title: String,
    phone: String,
    domain: String,
    street: String,
    city: String,
    state: String,
    zip: String,
    found: Number,
});

module.exports = db.model('Leadgen', leadgenSchema);