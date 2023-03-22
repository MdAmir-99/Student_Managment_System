


const uploadAssingment = async ( req, res ) =>
{
    try
    {
        const sendData = req.uploadAssignment;
        await TeacherModel.create( sendData );
        return res.status( 201 ).send( { status: true, message: "Assignment Uploaded Successfully !" } )
    } catch ( error )
    {
        return res.status( 400 ).send( { status: false, message: error.message } );
    }
}


module.exports = { uploadAssingment }