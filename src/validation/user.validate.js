const isValidEmail = ( email ) =>
{
    email = email.trim();
    return /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}/.test( email );

}

const isValidMobile = ( mobile ) =>
{
    mobile = mobile.trim();
    return /^[6-9]{1}[0-9]{9}$/.test( mobile );
}

module.exports = { isValidEmail, isValidMobile }