import express from 'express'
import dotenv from 'dotenv'
import conn from './db.js'
import cookieparser from 'cookie-parser'
import pageRoute from './routes/PageRoute.js'
import PhotoRoute from './routes/PhotoRoute.js'
import UserRoute from './routes/UserRoute.js'
import { checkUser } from './midllewares/AuthMidllewares.js'


//veritabanı calıstırdık
conn() 
 
//dotenv config metodunu calıstırıyoruz.
dotenv.config();

//express uygulamasını baslatıyoruz
const app = express(); 

//uygulamanın calıstıgı port tanımlıyoruz
const port = process.env.PORT;

//ejs template engine,  html dosya uzantilarını .ejs cevirdik render etmek icin
app.set("view engine", "ejs") 

// 'public' klasöründeki dosyaları istemcilere sunmak için
app.use(express.static('public'))

//body'de gonderdigimiz json formatında verileri okunması icin, eklemezsek undefined doner
app.use(express.json());

//form body icerisindeki verileri parse ediyor, parametre alıyor
app.use(express.urlencoded({extended: true}));

//func. olarak calıstırıyoruz.
app.use(cookieparser()); 




//ilgili dizine get istegi atıldıgında veya url'de gelindiginde, ilgili func. calıstır. 
app.use("/", pageRoute )
app.use("/photos", PhotoRoute )
app.use("/users", UserRoute )

//get olan tum sayfalarda, kayıtlı kulanıcı kontrol et
app.get("*", checkUser,)


 

// 1. parametre dinlemek istedigimiz port alıyor ve 2. parametre callback func.  , port dinliyor
app.listen(port, ()=>{
    console.log(`uygulamanın calıstıgı port :uygulamanın calıstıgı port : ${port}`);
});











//////////////////////////
/*
req(istek) = istek client den yapılan istekler 
res(cevap) = geriye donen cevap serverden 
---
nodemon paket = sunucuyu otamatik kendi baslatıyor.
ejs paket  = html dosyalarının uzantısını .ejs ceviriyoruz js gibi kulanmak icin, render edecez
dotenv paket = .env dosyasına ulasmamızı saglıyor 
mongoose paket = modals klasoru altında olsuturdugmz yapıyı, veritabanına gonderiyor, db ile bag saglıyor
Schema  = tabloları olusturuyoruz
jsonwebtoken = token
cocike = 

*/

