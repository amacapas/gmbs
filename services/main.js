const BusinessModel = require('../models/business');
const LinkedinModel = require('../models/linkedin');
const LeadgenModel = require('../models/leadgen');

const main = async () => {

    try {
        console.time('executed');

        let data = {};
        let find = '';
        let domain = '';
        let business = '';
        let leadgen = [];

        const docs = await LinkedinModel.find();

        for (let doc of docs) {
            business = doc.business_name.replace(/\s{2,}/g, ' ').replace(/;/g, '');

            find = await BusinessModel.find({ name: business, address: doc.street }, { _id: 0, phone: 1 });

            if(doc.website) {
                domain = new URL(doc.website);
                domain = domain.hostname.replace('www.','');
            }

            console.log(business, ' => ', find.length);

            if(find.length) {
                data = {
                    business,
                    contact: `${doc.first_name} ${doc.last_name}`,
                    email: doc.email,
                    title: doc.position,
                    phone: doc.phone,
                    domain,
                    street: doc.street,
                    city: doc.city,
                    state: doc.state,
                    zip: doc.zipcode,
                    found: find.length
                };
    
                // console.log(doc);
                console.log(data);
                // return;

                // leadgen.push(data);

                // save to db
                LeadgenModel.create(data, (err, res) => {
                    if (err) return handleError(err);
                    console.log(res);
                })
            }
        }

        // await LeadgenModel.insertMany(leadgen, (error, docs) => {
        //     if(error) {
        //         console.log('ERROR:', error);
        //     } else {
        //         console.log(`Successfully added ${docs.length} leadgen.`);
        //     }
        // });

        console.timeEnd('executed');

    } catch(err) {
        console.error(err)
    }
}

module.exports = main;