module.exports = {
    app: {
        name: 'testWork',
        version: '1.0.1'
    },
    server: {
        port: 3000
    },
    product: {
        tableName: 'test'
    },
    database: {
        master: {
            host: "localhost",
            user: "root",
            password: "password",
            port: "3306",
            database: "tested",
            connectionLimit: 5,
        }
    }
};