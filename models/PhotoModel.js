import mongoose from 'mongoose'

//"Schema" ile db tablo yapısını kuruyoruz
const {Schema } = mongoose;

//veritabanı tablo ozeliklerini tanımlıyoruz, yeni schema olusturduk
const photoSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    uploadedAd: {
        type: Date,
        default: Date.now,
    },
    user:{
        //objectId alıyor
        type: Schema.Types.ObjectId,

        //userda olsututdugumuz model ile eslesmesi gerek
        ref: "user",
    },
    url:{
        type: String,
        require: true
    }
});

//model olusturuyoruz, 1. parametre model adı, 2. parametre schema adını veriyoruz
const Photo = mongoose.model('Photo', photoSchema);

export default Photo