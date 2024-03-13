import mongoose from 'mongoose';
import bcrypt from 'bcrypt';


const {
  Schema
} = mongoose;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
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