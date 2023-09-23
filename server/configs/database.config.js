const mongoose = require('mongoose');
const dbUrl = process.env.DB_URL;
const dbName = process.env.DB_NAME;

mongoose
    .connect(dbUrl, {
        dbName,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        autoIndex: true,
    })
    .then((status) => console.info(`Connection establised to ${dbName}`))
    .catch((err) =>
        console.error(`Could not connect to database: ${err.message}`)
    );