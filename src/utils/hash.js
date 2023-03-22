// Includes crypto module
const crypto = require( 'crypto' );

// Defining algorithm
const algorithm = 'aes-256-cbc';

// Defining key
const key = crypto.randomBytes( 32 );

// Defining iv
const iv = crypto.randomBytes( 16 );

// An encrypt function
const encrypt = ( text ) =>
{

    // Creating Cipheriv with its parameter
    let cipher =
        crypto.createCipheriv( algorithm, Buffer.from( key ), iv );

    // Updating text
    let encrypted = cipher.update( text );

    // Using concatenation
    encrypted = Buffer.concat( [ encrypted, cipher.final() ] );

    // Returning iv and encrypted data
    return `${ iv.toString( 'hex' ) },${ encrypted.toString( 'hex' ) }`
}

// A decrypt function
const decrypt = ( text ) =>
{
    text = text.split( ',' );
    let ivKey = text[ 0 ];
    let encString = text[ 1 ];
    let iv = Buffer.from( ivKey, 'hex' );
    let encryptedText =
        Buffer.from( encString, 'hex' );

    // Creating Decipher
    let decipher = crypto.createDecipheriv(
        algorithm, Buffer.from( key ), iv );

    // Updating encrypted text
    let decrypted = decipher.update( encryptedText );
    decrypted = Buffer.concat( [ decrypted, decipher.final() ] );

    // returns data after decryption
    return decrypted.toString();
}



module.exports = { encrypt, decrypt }