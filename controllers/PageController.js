
//hangi func. cagırıldıgında o sayfayı geriye render ediyor.

const getIndexPage =(req, res)=>{

    res.render("index")
}

const getAboutPage =(req, res)=>{

    res.render("about")
}

const getRegisterPage =(req, res)=>{

    res.render("register")
}

const getLoginPage =(req, res)=>{

    res.render("login")
}

const getLogout =(req, res)=>{

    res.render("logout")
}

const getContactPage =(req, res)=>{

    res.render("contact")
}

const sendMail =(req, res)=>{

    res.render("contact")
}




export {getIndexPage, getAboutPage, getRegisterPage, getLoginPage, getLogout, getContactPage, sendMail};