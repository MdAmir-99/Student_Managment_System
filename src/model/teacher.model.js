const { Schema, model } = require( 'mongoose' );
const ObjectId = Schema.Types.ObjectId;

const TeacherSchema = Schema( {

    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    assignmentFile: {
        type: String,
        required: true
    },
    students: [ {
        type: ObjectId,
        ref: 'student'
    } ]
}, { timestamps: true } )


module.exports = model( 'Teacher', TeacherSchema )