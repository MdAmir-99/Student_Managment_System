const route = require( 'express' ).Router();
const { registerStudent, login } = require( '../controller/student.controller' );
const { uploadAssingment } = require( '../controller/teacher.controller' );
const { registerValidator, loginValidator } = require( '../middlewares/validator.middleware' );
const { assignmentValidator } = require( '../middlewares/assignmentValidator.middleware' );

route.post( '/register', registerValidator, registerStudent )
    .post( '/login', loginValidator, login )
    .post( '/upload', assignmentValidator, uploadAssingment );


module.exports = route;