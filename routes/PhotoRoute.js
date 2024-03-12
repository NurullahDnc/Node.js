import express from 'express'
import * as PhotoController from '../controllers/PhotoController.js'

const route = express.Router();

//buraya post islemi oldugu zaman, createPhoto calıstır, ve "/"" olmasının sebebi app.js de tanımlıyouz yolunu
route.route("/").post(PhotoController.createPhoto)
route.route("/").get(PhotoController.getPhoto)


export default route;





/*

route url: "/" yerine, "/test" olsaydı = istek atılan yer bura olurdu "/photos/test"  


*/