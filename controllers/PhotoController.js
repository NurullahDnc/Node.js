import Photo from "../models/PhotoModel.js";

//fotograf olusturucaz
const createPhoto =(req, res)=>{

    //veri req'den geliyor, "Photo" modeline gore photo olsuturuyor, olusturulan photo'yu degiskenine atıyor,
    const photo = Photo.create(req.body);

    //geriye yanıt donduruyoruz status kodu: 201, json formatında veriyi donderdik ve basarılı
    res.status(201).json({
        succeeded: true,
        photo
    })
}


export {createPhoto}