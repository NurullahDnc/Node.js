import User from "../models/UserModal.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import Photo from "../models/PhotoModel.js";


//user olusturma
const createUser = async (req, res) => {

    try {
        const user = await User.create(req.body);
        res.status(201).json({ user: user._id });

    } catch (error) {

        let errors2 = {}
        console.log("err", error);

        //e posta kontol ediyor varmı, 11000 hata koduna esit, error2'nin email'ne hata ata
        if (error.code === 11000) {
            errors2.email = 'The Email is already registered';
        }

        if (error.name === "ValidationError") {

            // Hatanın içindeki her bir hata ögesi için işlem yap
            Object.keys(error.errors).forEach((key) => {

                //her hatayı key'ine gore errors2 icerisine at
                errors2[key] = error.errors[key].message
            })
        }
        console.log('ERRORS2:::', errors2);
        res.status(400).json(errors2)
    }
}

//user girisi
const loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;
        console.log('req.body', req.body);

        //kulanıcı varmı kontrolunu yapıyor,  findOne metodu'da sadece username yazmak yeterli karsılastırma yapıyor
        const user = await User.findOne({
            username
        });

        //sifre kontrolu icin 
        let same = false;

        //user varsa, compare metodu ile sifreleri karsılastır, same degiskenine ata true-false / user yoksa 401 kodu don
        if (user) {
            same = await bcrypt.compare(password, user.password);
        } else {
            //kulanıcı yoksa hatayı return et kodu sonlandır.
            return res.status(401).json({
                succeded: false,
                error: 'There is no such user',
            });
        }

        //same dogru ise yani sifre dogru 200 kodu dondur  /  sifre hatalı ise 401 kodunu dondur
        if (same) {

            //func. userId gonderiyor token olsutuyoruz, token cookie kayıt ediyor
            const token = createToken(user._id);
            res.cookie('jwt', token, {
                httpOnly: true,
                maxAge: 1000 * 60 * 60 * 24,
            })

            //giris sonrası yonelendirme yap
            res.redirect("/users/dashboard")

        } else {
            res.status(401).json({
                succeded: false,
                error: 'Paswords are not matched',
            });
        }

    } catch (error) {
        res.status(500).json({
            succeded: false,
            error,
        });
    }
};


//login oldugunda token olusturuyor
const createToken = (userId) => {

    //sign metodunu cagırıyoruz, 1. parametre userId, 2.paramtre imzalanması icin gizli anahtar, 3. parametre ise gecerlilik suresi 
    return jwt.sign({
        userId
    }, process.env.JWT_SECRET, {
        expiresIn: "1d"
    })
}


const getDashboardPage = async (req, res) => {

    //user = giris yapam user esit olan fotoları gonder
    const photos= await Photo.find({user: req.user._id})

    //user bilgisini gonderiyoruz
    res.render("dashboard", {
        user: req.user,
        photos
    })

}






export {
    createUser,
    loginUser,
    getDashboardPage
}









/*
    findById = id gore bulma 
    findOne  = user name gore bulma

*/