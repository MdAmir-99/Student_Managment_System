const TeacherModel = require( '../model/teacher.model' );
const { isEmpty } = require( '../validation/common.validate' );
const { uploadFile } = require( '../aws/fileUpload' );
const studentModel = require( '../model/student.model' );
const { encrypt, decrypt } = require( '../utils/hash' )

const assignmentValidator = async ( req, res, next ) =>
{
    try
    {
        const { title, description, students } = req.body;
        let assignmentFile = req.files;
        let sendData = {};
        const studentsIdArray = students.split( ',' );

        if ( isEmpty( req.body ) )
        {
            return res.status( 400 ).send( { status: false, message: "Please fill Mandetory Fields !" } )
        }

        if ( !title )
        {
            return res.status( 400 ).send( { status: false, message: "title required !" } );
        }

        if ( !description )
        {
            return res.status( 400 ).send( { status: false, message: "description required !" } );
        }

        const studentsData = [];
        for ( let i = 0; i < studentsIdArray.length; i++ )
        {
            const studentDoc = await studentModel.findById( studentsIdArray[ i ] ).select( { email: 1, mobile: 1 } );
            if ( !studentDoc )
            {
                return res.status( 400 ).send( { status: false, message: "You Enter Invalid Student Id" } );
            }

            studentsData.push( studentDoc );

        }

        if ( !assignmentFile.length )
        {
            return res.status( 400 ).send( { status: false, messsage: "Assignment required !" } )
        }

        if ( assignmentFile && assignmentFile?.length > 0 )
        {
            if ( assignmentFile[ 0 ].mimetype == "application/msword" || assignmentFile[ 0 ].mimetype == "application/pdf"
                || assignmentFile[ 0 ].mimetype == "image/png" || assignmentFile[ 0 ].mimetype == "image/jpg" || assignmentFile[ 0 ].mimetype == "image/jpeg" )
            {
                const uploaded = await uploadFile( assignmentFile[ 0 ] );
                assignmentFile = encrypt( uploaded );
            }
            else
            {
                return res.status( 400 ).send( { status: false, message: "Profile image should be in jpg, jpeg or png format !!" } );
            }
        }
        sendData = { title, description, students: studentsData, assignmentFile };

        req.uploadAssignment = sendData;
        next();

    } catch ( error )
    {
        return res.status( 500 ).send( { status: false, message: error.message } )
    }

}

module.exports = { assignmentValidator };