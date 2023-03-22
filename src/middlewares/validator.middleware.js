const { isEmpty } = require( '../validation/common.validate' );
const StudentModel = require( '../model/student.model' );
const { uploadFile } = require( '../aws/fileUpload' )
const { isValidMobile, isValidEmail } = require( '../validation/user.validate' );
const CryptoJs = require( 'crypto-js' );
const { encrypt, decrypt } = require( '../utils/hash' );
const registerValidator = async ( req, res, next ) =>
{
    try
    {
        const { firstName, lastName, schoolName, email, mobile, password } = req.body;
        let profileImage = req.files;

        let sendData = {};
        if ( isEmpty( req.body ) )
        {
            return res.status( 404 ).send( { status: false, message: "All Fileds are Mandetory !" } )
        }

        if ( !firstName )
        {
            return res.status( 404 ).send( { status: false, message: "FirstName is mandatory" } );
        }
        if ( !lastName )
        {
            return res.status( 404 ).send( { status: false, message: "LastName is mandatory" } );
        }
        if ( !schoolName )
        {
            return res.status( 404 ).send( { status: false, message: "schoolName is mandatory" } );
        }

        const isStudentExist = await StudentModel.findOne( { $or: [ { email }, { mobile } ] } )

        if ( isStudentExist )
        {
            return res.status( 409 ).send( { status: false, message: "Student is Already Resgistered !" } )
        }

        if ( !isValidEmail( email ) )
        {
            return res.status( 400 ).send( { status: false, message: "Please Enter a Valid Email !" } )
        }


        if ( !isValidMobile( mobile ) )
        {
            return res.status( 400 ).send( { status: false, message: "Please Enter a Valid Mobile Number !" } )
        }

        let encPassword = CryptoJs.AES.encrypt(
            password,
            process.env.PASSWORD_ENC_SEC_KEY
        ).toString();

        if ( profileImage?.length == 0 )
        {
            return res.status( 400 ).send( { status: false, message: "profileImage is required" } )
        }

        if ( profileImage && profileImage?.length > 0 )
        {
            if ( profileImage[ 0 ].mimetype == "image/jpeg" || profileImage[ 0 ].mimetype == "image/jpg"
                || profileImage[ 0 ].mimetype == "image/png" )
            {
                const uploaded = await uploadFile( profileImage[ 0 ] );
                profileImage = encrypt( uploaded );
            }
            else
            {
                return res.status( 400 ).send( { status: false, message: "Profile image should be in jpg, jpeg or png format !!" } );
            }
        }

        sendData = { firstName, lastName, schoolName, email, mobile, password: encPassword, profileImage };
        req.registerUser = sendData;
        next();
    } catch ( error )
    {
        return res.status( 500 ).send( { status: false, message: error.message } )
    }
}


const loginValidator = async ( req, res, next ) =>
{
    try
    {
        const { userName, password } = req.body; // userName = mobile

        if ( isEmpty( req.body ) )
        {
            return res.status( 404 ).send( { status: false, message: "All Fileds are Mandetory !" } )
        }

        if ( !isValidMobile( userName ) )
        {
            return res.status( 400 ).send( { status: false, message: "Please Enter a Valid Mobile Number !" } )
        }
        if ( !password )
        {
            return res.status( 400 ).send( { status: false, message: "Please Enter a Password" } );
        }

        const studentDoc = await StudentModel.findOne( { mobile: userName } );

        if ( !studentDoc )
        {
            return res.status( 401 ).send( { status: false, message: "UserName or Password Wrong !" } )
        }

        const decryptPassword = CryptoJs.AES.decrypt(
            studentDoc.password,
            process.env.PASSWORD_ENC_SEC_KEY
        );
        const confirmPass = decryptPassword.toString( CryptoJs.enc.Utf8 );

        if ( password !== confirmPass )
        {
            return res.status( 401 ).send( { status: false, message: "UserName or Password Wrong !" } )
        }

        studentDoc[ 'profileImage' ] = decrypt( studentDoc?.profileImage )

        req.loggedInUser = studentDoc;

        next();
    } catch ( error )
    {
        return res.status( 500 ).send( { status: false, message: error.message } )
    }
}


module.exports = { registerValidator, loginValidator }