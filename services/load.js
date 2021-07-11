const xl = require('xlsx');

const BusinessModel = require('../models/business');

const loadData = async (path) => {

    if(!path) {
        console.log('File path not define.');
        exit();
    }

    const wb = xl.readFile(path);
    const ws = wb.Sheets[wb.SheetNames[0]];
    const rows = xl.utils.sheet_to_json(ws, { header: 1 });
    
    // xl.utils.sheet_to_csv
    // xl.utils.json_to_sheet

    // const len = 20;
    const len = (rows.length-1);
    
    let i = 1;
    let row = [];
    let loc = [];
    let doc = [];
    let add = [];
    let tmp = [];
    let business = {};

    let street = '';
    let city = '';
    let state = '';
    let zip = '';

    try {
        console.time('executed');

        for (i = 1; i <= len; i++) {
            row = rows[i];
            
            // parse address
            loc = JSON.parse(row[0]);

            // parse street, state, zip
            if(Array.isArray(loc)) {
                if(loc.length == 3) {
                    street = loc[0];
                    add = loc[1].split(',');
                }

                if(loc.length == 2) {
                    add = loc[0].split(',');
                }
                
                city = add[0];
                if(add[1]) {
                    tmp = add[1].trim().split(' ');
                    state = tmp[0],
                    zip = tmp[1]
                }
            }

            business = {
                name: row[3],
                phone: row[1],
                domain: row[2],
                street,
                city,
                state,
                zip
            };

            // console.log(business);

            doc.push(business);
        }

        console.timeEnd('executed');

        await BusinessModel.insertMany(doc, (error, docs) => {
            if(error) {
                console.log('ERROR:', error);
            } else {
                console.log(`Successfully added ${docs.length} businesses.`);
            }
        });

    } catch(err) {
        console.error(err)
    }
}

module.exports = loadData;