const db = require('../db/connect');

const businessSchema = new db.Schema({
    updated_ts: Number,
    inserted_ts: Number,
    whois_info: Object,
    amenities: Array,
    accessibility: Array,
    claimThisBusinessUrl: Boolean,
    claimThisBusiness: Boolean,
    temporarilyClosed: Boolean,
    photoResolution: Array,
    photoNum: Number,
    photoUrl: String,
    reviewsUrl: String,
    description: String,
    place_id: String,
    popular_time: Array,
    working_days: Object,
    payments: Array,
    address_full: String,
    categories: Array,
    name: String,
    coord: Array,
    domain: String,
    raiting: Number,
    reviews: Number,
    phone: String,
    address: Array,
    lang: String,
    location: String,
    query: String,
    page: Number,
    url: String,
    dynadot: Array,
    claimThisBusinessCurrentEmail: Boolean,
    claimThisBusinessEmailValidation: Boolean,
    claimThisBusinessPhoneValidation: Boolean,
    claimThisBusinessCurrentPhone: Boolean,
    claimThisBusinessDomainValidation: Boolean,
    claimThisBusinessCurrentDomain: Boolean,
    gmb_verified: Boolean,
    claimThisBusinessBusinessValidation: Boolean,
    claimThisBusinessBusinessValidation: Boolean,
    claimThisBusinessPostCardByEmailValidation: Boolean,
    claimThisBusinessPostCardByEmailCurrentAddress: Boolean,
    gmb_id: Number,
    tld: String,
    gmb_account_id: String,
    gmb_verified_dt: String,
    gmb_verified_ts: Number,
    error: String,
});

module.exports = db.model('Business', businessSchema);