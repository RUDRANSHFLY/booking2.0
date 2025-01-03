import mysql from "mysql2/promise"



const connectDB = async () => {

    const host = process.env.HOST;
    const user = process.env.USER;
    const password = process.env.PASSWORD;
    const database = process.env.DATABASE;
    const port = process.env.DBPORT;

    const connection = await mysql.createConnection({
        host: host,
        user: user,
        password: password,
        database: database,
        port: port,
    });

    try {
        if(!connection){
            return new Error('Unable To Connect to Database')
        }
        return connection;

    } catch (error) {
        console.log("Error connecting to Db", error);

    }

}

export default connectDB;   
