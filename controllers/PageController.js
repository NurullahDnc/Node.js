
//hangi func. cagırıldıgında o sayfayı geriye render ediyor.


//{ user: req.user }  = manuel userları gonderdim

const getIndexPage =(req, res)=>{ res.render("index", { user: req.user }) }

const getAboutPage =(req, res)=>{ res.render("about", { user: req.user }) }


    //uzer biz gonderiyoruz
const getRegisterPage =(req, res)=>{ res.render("register" , { user: req.user }) }


const getLoginPage =(req, res)=>{ res.render("login" , { user: req.user }) }


const getLogout = (req, res) => {

    //remove olmadıgı icin boyle yontem kulanıldı
    res.cookie('jwt', '', {
      maxAge: 1,
    });
    //cıkıs sonrası yoneldir
    res.redirect('/');
  };


const getContactPage =(req, res)=>{ res.render("contact")  }

const sendMail =(req, res)=>{ res.render("contact") }




export {getIndexPage, getAboutPage, getRegisterPage, getLoginPage, getLogout, getContactPage, sendMail};