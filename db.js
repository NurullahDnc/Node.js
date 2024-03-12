    import mongoose from 'mongoose'
    import dotenv from 'dotenv';


    dotenv.config();

    //veritabanı baglantısı yapıyor,
    const conn = () => {

        mongoose.connect(process.env.DB_URL, {
            dbName: "youtbenodearin",
            
        }).then(() => {
            console.log("Connected to the DB succesully");
        }).catch((err) => {
            console.log(`DB errors: ${err}`);
        })
    }

    export default conn;