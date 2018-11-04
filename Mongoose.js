//Paquets
const mongoose = require('mongoose');

//connection mongoose
mongoose.connect('mongodb://localhost/graphQlTest', { useNewUrlParser: true} );

const db = mongoose.connection;

//export mongoose
module.exports = () => {

    //connection à la bdd
    db.once('open', async () => { await console.log('connecté à la bdd!!') });

    //affichage des erreurs en cas de problèmes de connexion
    db.on('error', async (error) => { await console.log(error) } );

};