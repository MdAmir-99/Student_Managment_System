const StudentModel = require( '../model/student.model' );
const jwt = require( 'jsonwebtoken' );


const registerStudent = async ( req, res ) =>
{
    try
    {
        const sendData = req.registerUser;
        await StudentModel.create( sendData );
        return res.status( 201 ).send( { status: true, message: "Student Registered Successfully !" } )
    } catch ( error )
    {
        return res.status( 500 ).send( { status: false, message: error.message } )
    }
}


const login = async ( req, res ) =>
{
    try
    {
        const studentDoc = req.loggedInUser;
        const payload = {
            userId: studentDoc._id
        };
        let token = jwt.sign( payload, process.env.JWT_SEC_KEY, { expiresIn: '1m' } );

        return res.status( 200 ).send( { status: true, message: "Login Successfull", data: studentDoc, token } )
    } catch ( error )
    {
        return res.status( 500 ).send( { status: false, message: error.message } )
    }
}

module.exports = { registerStudent, login }