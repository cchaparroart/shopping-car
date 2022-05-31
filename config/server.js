const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const cors = require('cors');
const dbConnection = require('../config/dbMongo');
const shoppingSchema = require('../controllers/schema/shoppingSchema');
const { valideError } = require('../middlewares/valideMiddlewares');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.rutaProduct = '/api/product';
        this.rutaShoppingCar = '/api/shoppingCar';
        this.rutaCategory = '/api/category';
        this.rutaGrap = '/graphql';
        this.clientRedis;
        this.conectDB();
        this.middlewares();
        this.routes();
        this.middlewaresError();
       

    }

    routes() {
        this.app.use(this.rutaProduct, require('../routes/productRouter'));
        this.app.use(this.rutaShoppingCar, require('../routes/shoppingCarRouter'));
        this.app.use(this.rutaCategory, require('../routes/categoryRouter'));
        this.app.use(this.rutaGrap, graphqlHTTP({
            schema: shoppingSchema,
            graphiql: true,
        }));
    }

    middlewares() {
        this.app.use(express.static('public'));
        this.app.use(cors());
        this.app.use(express.json());


    }

    middlewaresError() {

        this.app.use(valideError);

    }

    async conectDB() {
        await dbConnection();



    }

    listen() {

        this.app.listen(process.env.PORT, () => {

            console.log('Servidor corriendo en puesto', this.port);

        });
    }
}

module.exports = Server;