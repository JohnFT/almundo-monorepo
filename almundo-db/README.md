# almundo db

# usage

--- js 
const setupDatabase = require('almundo-db');

setupDatabase(config).then(db => {
    const db = db;
}).cathc(err => console.error(err));