const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const cors = require('cors');
const dbConnection = require('../config/dbMongo');
const  shoppingSchema = require('../controllers/schema/shoppingSchema');

class Server {
    
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.rutaProduct = '/api/product';
        this.rutaShoppingCar = '/api/shoppingCar';
        this.rutaGrap = '/graphql';
        this.clientRedis;
        this.conectDB();
        this.middlewares();
        this.routes();
    }

    routes() {
        this.app.use(this.rutaProduct, require('../routes/product'));
        this.app.use(this.rutaShoppingCar, require('../routes/shoppingCar'));
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