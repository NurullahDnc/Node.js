import express from 'express'

//express uygulamasını baslatıyoruz
const app = express();

//uygulamanın calıstıgı port tanımlıyoruz
const port = 3000;

//ejs template engine,  html dosya uzantilarını .ejs cevirdik render etmek icin
app.set("view engine", "ejs")

// 'public' klasöründeki dosyaları istemcilere sunmak için
app.use(express.static('public'))


// ana dizine get istegi atıldıgı zaman calısacak, 2 tane parametre alır req ve res 
app.get("/", (req, res)=>{
    // index sayfasını render ettik
    res.render("index")
})

app.get("/about", (req, res)=>{
     res.render("about")
})

app.get("/blog", (req, res)=>{
    res.render("blog")
})



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



*/

