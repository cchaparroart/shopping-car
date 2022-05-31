const mongodb = require("@condor-labs/mongodb")();
const Schema = mongodb.mongoose.Schema;
const category = Schema({
    code: {
        type: String,
        required: true,
        unique: true
    },
    describe: {
        type: String,
        required: true,
    },
});
const modelCategorys = mongodb.mongoose.model('Category', category);

module.exports = modelCategorys;