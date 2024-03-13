import User from '../models/UserModal.js';
import jwt from 'jsonwebtoken';


// Token, yetkilendirme doğrulama işlemini, token karsılastırıyor 
const authenticateToken = async (req, res, next) => {

    try {
        // İstek başlığından token alınır
        const token = req.headers["authorization"] && req.headers["authorization"].split(" ")[1];

        // Eğer token yoksa
        if (!token) {
            return res.status(401).json({
                succeeded: false,
                Error: "no token available"
            });
        }

        // token icerisinden userId buluyor, token ve secretKey alıyor, lazım olan userId
        req.user = await User.findById(jwt.verify(token, process.env.JWT_SECRET).userId);

        // Sonraki adıma geç
        next();
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