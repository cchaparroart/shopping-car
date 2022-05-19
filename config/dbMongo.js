const dbSettings = require("./parameter");
const mongo = require("@condor-labs/mongodb")(dbSettings.settings);

const dbConnection = async () => {
    try {
        await mongo.getClient();
        console.log(`isConnected(after):${mongo._isConnected()}`);

    } catch (error) {
        console.log(error);
        throw new Error("Error al conectar en la DB");

    }
}
module.exports = dbConnection;