const dbSettings = {
    settings: {
        host: process.env.DATABASE_HOST,
        port: process.env.DATABASE_PORT,
        database: process.env.DATABASE_NAME,
        user: process.env.DATABASE_USERNAME,
        password: process.env.DATABASE_PASSWORD,
        ssl: false,
        authSource: "admin"
    },

    settingsRedis: {
       
        host: process.env.DATABASE_HOST_REDIS,
        port: process.env.DATABASE_PORT_REDIS,
    },
};


module.exports = dbSettings;