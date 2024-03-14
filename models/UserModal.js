import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import validator from 'validator';


const {
  Schema
} = mongoose;

const userSchema = new Schema({
  //required= olmazsa hata mesajı don, validate= dogrulama yapıyor sadece numara ve harflerden olusacak
  username: {
    type: String,
    required: [true, 'Username area is required'],
    lowercase: true,
    validate: [validator.isAlphanumeric, 'Only Alphanumeric characters'],
  },
  email: {
    type: String,
    required: [true, 'Email area is required'],
    unique: true,
    validate: [validator.isEmail, 'Valid email is required'],
  },
  password: {
    type: String,
    required: [true, 'Password area is required'],
    minLength: [4, 'At least 4 characters'],
  },
}, {
  timestamps: true,
});




//password hash'leme,  next parametresi alıyor islem tamamlandıktan sonra bi sonraki isleme geç
userSchema.pre('save', function (next) {

  //user uzerinde islem yapıcaz
  const user = this;

  //hash metodu ile user.password alıyor, 2. parametre sifrenin karmasıklık uzunlugu, 3. parametre hata ve hash sifre donuyor
  bcrypt.hash(user.password, 10, (err, hash) => {
    //hash'lenmis password, user.password at - next metodunu calustırıyoruz.
    user.password = hash;
    next();
  });
});


const User = mongoose.model('User', userSchema);

export default User;