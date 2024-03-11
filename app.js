import express from 'express'

//express uygulamasını baslatıyoruz
const app = express();

//uygulamanın calıstıgı port tanımlıyoruz
const port = 3000;

// ana dizine get istegi atıldıgı zaman calısacak, 2 tane parametre alır req ve res 
app.get("/", (req, res)=>{
    res.send("merhaba 2")
})



// 1. parametre dinlemek istedigimiz port alıyor ve 2. parametre callback func.  , port dinliyor
app.listen(port, ()=>{
    console.log(`uygulamanın calıstıgı port :uygulamanın calıstıgı port : ${port}`);
});



//////////////////////////
/*
req = istek client den yapılan istekler 
res = geriye donen cevap serverden 
---
nodemon paket = sunucuyu otamatik kendi baslatıyor.




*/

