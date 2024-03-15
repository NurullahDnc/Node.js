import Photo from "../models/PhotoModel.js";
import {
    v2 as cloudinary
} from "cloudinary"
import fs from "fs"

//fs = resim yukledikten sonra tmp klasorunden kaladıryoruz, node.js icinde bulunuyor paket

//fotograf olusturucaz
const createPhoto = async (req, res) => {

    try {
        //cloudinary'e gorsel yukleme islemi / files.image = imput'un name="image" olacak / encetype de ekle input'a
        const result = await cloudinary.uploader.upload(
            req.files.image.tempFilePath, {
                use_filename: true,
                 folder: 'lenslight_youtbe',
            }
        );

 
        // Fotoğraf oluşturma
        await Photo.create({
            name: req.body.name,
            description: req.body.description,
            user: res.locals.user._id, // Kullanıcı id'sini res.user içinden al
            url: result.secure_url // Yüklenen fotoğrafın url'si gonderiyoruz,  bu url uzerinde de map ile don
        });

        //yukleme sonrası temp dosyasından img kaldır.
        fs.unlinkSync(req.files.image.tempFilePath)

        // 201 gonder, yönlendir
        res.status(201).redirect("/users/dashboard");

    } catch (error) {
 
        res.status(500).json({
            succeeded: false,
            error: error.message
        });
    }
};

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

        //db'deki _id ile urlden gelen req.params id'leri karsılastır,    /user populate ediyor resimi yukeyen kulanıcııyı alama?
        const photo = await Photo.findById({
            _id: req.params.id
        }).populate("user")  

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
    createPhoto,
    getPhoto,
    getAPhoto
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