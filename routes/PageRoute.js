//*sayfa routerları
import express from 'express'
import * as PageController from '../controllers/PageController.js'

//express router ozeligini kulanıyoruz, router yapmak icin
const router = express.Router();

//route degiskenine route oldugunda ,yani "/" dizinlerine get istegi oldugunda, /getIndexPage func. calıstır
router.route('/').get(PageController.getIndexPage);
router.route('/about').get(PageController.getAboutPage);
router.route('/register').get(PageController.getRegisterPage);
router.route('/login').get(PageController.getLoginPage);
router.route('/logout').get(PageController.getLogout);
router.route('/contact').get(PageController.getContactPage);
// router.route('/contact').post(PageController.sendMail);

export default router;






//, * as imp =  controler klasorunde funcları {} icerisinde export ettik,  burda as kulanmadan func. {icine} yazarak imp edebiliriz