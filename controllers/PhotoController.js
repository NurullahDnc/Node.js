import Photo from "../models/PhotoModel.js";

//fotograf olusturucaz
const createPhoto = async (req, res) => {

    //bekeleme islemi oldugu icin async kulandık
    try {
        //veri req'den geliyor, "Photo" modeline gore photo olsuturuyor, olusturulan photo'yu degiskenine atıyor,
        const photo = await Photo.create(req.body);

        //geriye yanıt donduruyoruz status kodu: 201, json formatında veriyi donderdik ve basarılı
        res.status(201).json({
            succeeded: true,
            photo
        })

    } catch (error) {
        res.status(500).json({
            succeeded: false,
            error
        })
    }
}

//veritabanından photoları tamamını alıyor 
const getPhoto = async (req, res) => {

    try {
        const photos = await Photo.find({})

        //get istegi bsarılı oldugunda, photos sayfasını render et ve photos'ları gonder
        res.status(200).render("photos", {
            photos
        })

    } catch (error) {
        res.status(500).json({
            succeeded: false,
            error
        })
    }

}

//fotograflar detay
const getAPhoto = async (req, res) => {
    try {

        //db'deki _id ile req.params dan gelen id'leri karsılastır
        const photo = await Photo.findById({ _id : req.params.id})
        
        res.status(200).render("photo", {
            photo
        })

    } catch (error) {
        res.status(500).json({
            succeeded: false,
            error
        })
    }

}


export {
    createPhoto,getPhoto, getAPhoto
}













/*

//*verileri gonderme db den alıyor
const getPhoto = async (req, res) => {

    try {
        
        const photos = await Photo.find({})

        res.status(200).json({
            succeeded: true,
            photos
        })

    } catch (error) {
        res.status(500).json({
            succeeded: false,
            error
        })
    }

}

*/