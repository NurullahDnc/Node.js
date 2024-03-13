import User from '../models/UserModal.js';
import jwt from 'jsonwebtoken';


// Token, yetkilendirme doğrulama işlemini, token karsılastırıyor 
const authenticateToken = async (req, res, next) => {

    try {

        //cookies'den token alıyoruz.
        const token = req.cookies.jwt;

        if (token) {
            jwt.verify(token, process.env.JWT_SECRET, (err) => {

                //token verify isleminde hata varsa 
                if (err) {
                    console.log(err.message);
                    res.redirect("/login")
                } else {

                    // Sonraki adıma geç
                    next();
                }
            })
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
    authenticateToken
};