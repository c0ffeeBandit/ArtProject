const jwt = require('jsonwebtoken');
const secret = 'TheseAreNotTheDroidsYouAreLookingFor...MoveAlong';
function createToken( data ){
    return jwt.sign( data, secret, { expiresIn: '8h' } ); // do not expire while drawing, if i got drawing to work
}
function verifyToken( token ){
    return new Promise(( resolve, reject ) => {
        jwt.verify(token, secret, ( err, data ) => {
            if( !err ){
                resolve(data);
            }else if (err.includes("expired")){
                logout();
                return;
             }else if (err) {
                reject(err);
                return;
			}
        });
    });
}
function logout(){
    let cookies = document.cookie.split("; ");
    let token = cookies
        .find((cookie) => {
            return cookie.includes("x-auth-token");
        })
        .split("=")[1];
    console.log(token);
    let resources = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
        },
        body: "",
    };
    return fetch( "http://localhost:9000/api/user/logout", resources )
    .then((res) => {
        // console.log(res.status);
        // console.log(res.body);
        return res.json();
    })
    .then(() => {
        window.location.href = "http://localhost:3000/";
    });
}
module.exports = { createToken, verifyToken };