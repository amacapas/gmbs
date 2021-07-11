const db = require('../db/connect');

const shutdown = () => {
    if(db.connection.readyState) {
        db.connection.close(false, () => {
            console.log('closing connection...OK!');
        });
    }
}

module.exports = shutdown;