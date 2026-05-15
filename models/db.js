require("dotenv").config();
const { Sequelize } = require("sequelize");
const mysql2 = require("mysql2");

const sequelize = new Sequelize(
    process.env.MYSQLDATABASE,
    process.env.MYSQLUSER,
    process.env.MYSQLPASSWORD,
    {
        host: process.env.MYSQLHOST,
        port: process.env.MYSQLPORT,
        dialect: "mysql",
        dialectModule: mysql2,
        logging: false,
        pool: {max: 5, min: 0, idle: 3000, acquire: 10000}
    }
);

(async () => {
    try{
        await sequelize.authenticate();
         console.log("Banco de dados conectado com sucesso!")
    }catch(erro){
        console.log("Erro ao se conectar com o banco de dados " + erro);
    }
})

module.exports = {Sequelize,sequelize}
