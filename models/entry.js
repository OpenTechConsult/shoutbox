const redis = require('redis');
// Instantiates Redis Client
const db = redis.createClient();

class Entry {
    constructor(obj) {
        // Iterates keys in the object passed
        for (let key in obj) {
            // merge values
            this[key]  = obj[key];
        }
    }

    save(cb) {
        // converts save entry data to JSON string
        const entryJSON = JSON.stringify(this);
        db.lpush('entries', entryJSON, (err) => {
            if (err) return cb(err);
            cb();
        });
    }
    
}
module.exports = Entry;