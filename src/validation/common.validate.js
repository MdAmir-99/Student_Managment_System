const isEmpty = ( body ) =>
{
    return !Object.keys( body ).length;
}

const isValidString = ( val ) =>
{
    if ( typeof val === 'undefined' || val === null ) return false;
    if ( typeof val === 'string' && val.trim().length === 0 ) return false;
    return true
}





module.exports = { isEmpty, isValidString };