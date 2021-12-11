const models = require('../models');
const config = require('../config/config');
const utils = require('../utils');
// { // databse user
//     "art": [], // index of 'created' 'art objects'
//     "_id": "61a7eb8de0fba553d05d636c",
//     "username": "test",
//     "password": "$2b$11$GBVixBH9uMedHpA7tZ.mm.5bB7fYpukxHk4xI4XqbxIxGABuZv0wO",
//     "image": ""
//     "__v": 0
// }

module.exports = {
    get: ( req, res, next ) => {
			// console.log("user.get " ); // req.body,
			models.User.find()
            .then((users) => {
                // console.log( "user.get(got):", users );
                res.send( users );
            })
            .catch(next);
		},
    post: {
        register: ( req, res, next ) => {
            console.log( "user.post.register <body snipped>"); //, req.body );
            const { username, password, image } = req.body;
            // TODO: validate better
            if( !username ){
                console.log( "user.post.register No username provided" );
                if (!password) {
    				console.log( "user.post.register No password provided" );
					return false;
        		}
                return false;
            }
            models.User.create({ username, password, image })
            .then( ( createdUser ) => res.send( createdUser ) )
            .catch( next );
        },
        login: ( req, res, next ) => {
            console.log("user.post.login <body snipped>");//, req.body );
            const { username, password } = req.body;
            models.User.findOne({ username })
            .then((user) => Promise.all([ user, user.matchPassword( password )] ) )
            .then(([ user, match ]) => {
                if ( !match ){
                    res.status(401).send('Invalid password');
                    return;
                }
                // console.log("User Now Logged In");
                const token = utils.jwt.createToken({ id: user._id });
                res.cookie(config.authCookieName, token,{ maxAge: 900000, httpOnly: true })
                .send({user,token});
            })
            .catch( next );
        },
        logout: (req, res, next) => {
            console.log("user.post.logout"); //, req.body );
            const headerToken = req.headers.authorization.split(" ")[1];
            const token = req.cookies[config.authCookieName] || headerToken;
            // console.log(req.cookies);
            // console.log(token);
            models.TokenBlacklist.create({ token })
            .then(() => {
                res.clearCookie(config.authCookieName)
                .send('{"message":"User logout successful"}');
            })
            .catch(next);
            // console.log("User Now Logged Out");
        }
    },
    put: ( req, res, next ) => {
        console.log( "user.put ", req.body );
        const id = req.params.id;
        const { username, password, image } = req.body;
        models.User.update({ _id: id }, { username, password, image })
        .then(( updatedUser ) => res.send( updatedUser ))
        .catch( next );
    },
    delete: ( req, res, next ) => {
        console.log("user.delete ", req.body );
        // if delete fails, then it wasn't there to begin with
        const id = req.params.id;
        models.User.deleteOne({ _id: id })
        .then(( removedUser ) => res.send( removedUser ))
        .catch( next );
    }
};