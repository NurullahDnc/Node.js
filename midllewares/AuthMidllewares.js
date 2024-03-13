import User from '../models/UserModal.js';
import jwt from 'jsonwebtoken';


//kayıtlı kulanıcıyı alıyor
const checkUser = async (req, res, next) => {
    const token = req.cookies.jwt;

    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
            if (err) {
                console.log(err.message);
                //localdaki user null atıyor
                res.locals.user = null;
                next();
            } else {
                //token'dan decodedToken icinden userId alıyor
                const user = await User.findById(decodedToken.userId);
                res.locals.user = user;
                next();
            }
        });
    } else {
        res.locals.user = null;
        next();
    }
};



// Token, yetkilendirme doğrulama işlemini, token karsılastırıyor 
const authenticateToken = async (req, res, next) => {

    try {

        //cookies'den token alıyoruz.  jwt = usercontroller/loginUser'da tanımladık
        const token = req.cookies.jwt;

        if (token) {
            // jwt.verify fonksiyonunu await ile çağırın, kontrol edeiyor
            const decodedToken = await jwt.verify(token, process.env.JWT_SECRET);
            //decodedToken içinden userId alınarak kullanıcı bul
            const user = await User.findById(decodedToken.userId);
            // Kullanıcı req üzerinden erişilebilir hale getirin
            req.user = user;
            next();
        } else {
            res.redirect("/login")
        }

    } catch (error) {
        // Token doğrulama başarısız olursa veya kullanıcı bulunamazsa hata döndür
        return res.status(401).json({
            succeeded: false,
            Error: "invalid token"
        });
    }

};


export {
    authenticateToken,
    checkUser
};