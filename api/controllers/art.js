const models = require('../models');

module.exports = {
    get: (req, res, next) => {
        // console.log("art.get Getting Creations", req.body );
        models.Art.find()
        .then((arts) => {
            // console.log("art.get(got)", arts );
            console.log( "\n");
            for ( const entry of arts){
                console.log(`{ ${entry._id}, ${entry.creator}, ${entry.name}, ${entry.description}, ${entry.createdAt}, ${entry.updatedAt} }\n` );
            }
            res.send(arts);
        })
        .catch(next);
    },
    post: (req, res, next) => {
        console.log( "art.post", req.body ); // formatted JSON for creating a DB art object
        // has { creator, name, image }
        let temp = req.body;
        console.log( "Making Art with Creator._id", temp.creator, "Image name", temp.name );
        models.Art.create( req.body )
        .then( (createdArt) => {
            console.log( "CreatedArt._id", createdArt._id );
            return Promise.all([
                models.User.updateOne({ _id: req.body.creator }, { $push: { art: createdArt._id } }),
                models.Art.findOne({ _id: createdArt._id })
            ]);
        })
        .then(([modifiedObj, artObj]) => {
            // console.log( artObj );
            res.send(artObj);
        })
        .catch(next);
    },
    put: (req, res, next) => {
        console.log("art.put", req.body );
        const id = req.params.id;
        const { description } = req.body;
        models.Art.updateOne({ _id: id }, { description })
        .then((updatedArt) => res.send(updatedArt))
        .catch(next);
    },
    delete: (req, res, next) => {
        console.log("art.delete", req.body );
        const id = req.params.id;
        models.Art.deleteOne({ _id: id })
        .then((removedArt) => res.send(removedArt))
        .catch(next);
    }
};