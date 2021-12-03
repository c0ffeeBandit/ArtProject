const jwt = require('jsonwebtoken');
const secret = 'TheseAreNotTheDroidsYouAreLookingFor...MoveAlong';
function createToken( data ){
    return jwt.sign( data, secret, { expiresIn: '8h' } ); // do not expire while drawing, if i got drawing to work
}
function verifyToken( token ){
    return new Promise(( resolve, reject ) => {
        jwt.verify(token, secret, ( err, data ) => {
            if ( err ){
                console.log( "VerifyToken error" );
                reject( err ); return; }
            resolve( data );
        });
    });
}
module.exports = { createToken, verifyToken };