import express from 'express'
import { checkUser } from '../midllewares/AuthMidllewares.js';

import * as PhotoController from '../controllers/PhotoController.js'

const router = express.Router();

//buraya post islemi oldugu zaman, ilgili func. calıstır, ve "/"" olmasının sebebi app.js de tanımlıyouz yolunu , checkUser  = maunel gonderdim
router.route("/")
    .post(checkUser, PhotoController.createPhoto)
    .get(PhotoController.getPhoto)

    
    router.route('/:id').get(PhotoController.getAPhoto);



export default router;





/*

route url: "/" yerine, "/test" olsaydı = istek atılan yer bura olurdu "/photos/test"  ve yukarıdaki gibi tanımlaama yapılıyor "/" tekrar dan yazmaya gerek yok


*/