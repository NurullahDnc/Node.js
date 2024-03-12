import express from 'express'
import * as PhotoController from '../controllers/PhotoController'

const route = express.Router();

//buraya post islemi oldugu zaman, createPhoto calıstır, ve "/"" olmasının sebebi app.js de tanımlıyouz yolunu
route.route("/").post(PhotoController.createPhoto)

export default route;





/*

route url: "/" yerine, "/test" olsaydı = istek atılan yer bura olurdu "/photos/test"  


*/