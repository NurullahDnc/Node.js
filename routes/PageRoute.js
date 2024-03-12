//*sayfa routerları
import express from 'express'
import * as PageController from '../controllers/PageController.js'

//express router ozeligini kulanıyoruz, router yapmak icin
const route = express.Router();

//route degiskenine route oldugunda ,yani "/" dizinlerine get istegi oldugunda, /getIndexPage func. calıstır
route.route("/").get(PageController.getIndexPage)
route.route("/about").get(PageController.getAboutPage)

export default route;






//, * as imp =  controler klasorunde funcları {} icerisinde export ettik,  burda as kulanmadan func. {icine} yazarak imp edebiliriz