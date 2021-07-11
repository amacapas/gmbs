const xl = require('xlsx');
const fs = require('fs');

const BusinessModel = require('../models/business');
const LinkedinModel = require('../models/linkedin');
const LeadgenModel = require('../models/leadgen');

const main = async (path) => {

    if(!path) {
        console.log('File path not define.');
        exit();
    }
    
    let i = 0;
    let ii = 1;
    let filepath = '';

    let wb = '';
    let ws = '';

    let row = [];
    let rows = {};
    
    let doc = {};
    let docs = [];
    let len = 0;
    let business_name = '';
    let domain = '';

    try {
        console.time('executed');

        const files = getFiles(path);
        for (i = 1; i <= files.length; i++) {

            filepath = path+'/'+files[i];

            if (fs.existsSync(filepath)) {

                wb = xl.readFile(filepath);
                ws = wb.Sheets[wb.SheetNames[0]];
                rows = xl.utils.sheet_to_json(ws, { header: 1 });

                console.log(files[i], '=>', rows.length);

                // loop through file content here

                // xl.utils.sheet_to_csv
                // xl.utils.json_to_sheet

                // const len = 20;
                len = (rows.length-1);

                for (ii = 1; ii <= len; ii++) {
                    row = rows[ii];

                    business_name = row[4].replace(/\s{2,}/g, ' ').replace(/;/g, '');

                    if(row[5]) {
                        domain = new URL(row[5]);
                        domain = domain.hostname.replace('www.','');
                    }

                    doc = await BusinessModel.find({ name: business_name }, { _id: 0, phone: 1 });

                    console.log(ii, '=>', business_name, '==', doc.length);
                    // if(doc.length) {
                    //     leadgen = {
                    //         business: business_name,
                    //         contact: `${row[1]} ${row[2]}`,
                    //         email: row[0],
                    //         title: row[3],
                    //         phone: row[6],
                    //         domain,
                    //         street: row[7],
                    //         city: row[10],
                    //         state: row[9],
                    //         zip: row[8],
                    //         found: doc.length
                    //     };
            
                    //     // console.log(leadgen);
                    //     // return;
            
                    //     docs.push(leadgen);
                    // }
                }
            }
        }

        // console.log(docs);

        // await LeadgenModel.insertMany(docs, (error, docs) => {
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

const getFiles = path => {
    const files = [];
    for (const file of fs.readdirSync(path)) {
        const fullPath = path + '/' + file;
        if(fs.lstatSync(fullPath).isDirectory())
            getFiles(fullPath).forEach(x => files.push(file + '/' + x))
        else files.push(file)
    }
    return files;
}

module.exports = main;