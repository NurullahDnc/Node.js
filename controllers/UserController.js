import User from "../models/UserModal.js";
import bcrypt from 'bcrypt';


//user olusturma
const createUser = async (req, res) => {

    try {
        const user = await User.create(req.body);

        res.status(201).json({
            succeeded: true,
            user
        })

    } catch (error) {
        res.status(500).json({
            succeeded: false,
            error
        })
    }
}

//user girisi
const loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;
        console.log('req.body', req.body);

        //kulanıcı varmı kontrolunu yapıyor,  findOne metodu'da sadece username yazmak yeterli karsılastırma yapıyor
        const user = await User.findOne({ username });

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
            res.status(200).send('You are loggend in');
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



export {
    createUser,
    loginUser
}


/*
    findById = id gore bulma 
    findOne  = user name gore bulma

*/