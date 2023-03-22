const express = require( 'express' );
const mongoose = require( 'mongoose' );
const dotenv = require( 'dotenv' );
const multer = require( 'multer' );
const route = require( './routes' );
const db = require( './db' )

const app = express();
dotenv.config( { path: './.env' } );

app.set( 'port', process.env.PORT || 8080 );
app.use( express.json() );
app.use( express.urlencoded( { extended: true } ) );
app.use( multer().any() )

// DB Connection
db();


app.use( '/api', route )
app.listen( app.get( 'port' ), () =>
{
    console.log( `server running 🚀 @ http://localhost:${ app.get( 'port' ) }` )
} ) 