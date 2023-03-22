const mongoose = require( 'mongoose' );
const dotenv = require( 'dotenv' );
dotenv.config( { path: './.env' } );

const db = async () =>
{
    try
    {
        await mongoose.connect( process.env.DB_CON, { useNewUrlParser: true } )
        console.log( 'DB Connected successfully ✔' );
    } catch ( error )
    {
        console.log( 'DB Connection Failed', error.message )
    }
}

module.exports = db;