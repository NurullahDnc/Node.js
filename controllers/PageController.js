
//hangi func. cagırıldıgında o sayfayı geriye render ediyor.

const getIndexPage =(req, res)=>{

    res.render("index")
}

const getAboutPage =(req, res)=>{

    res.render("about")
}

export {getIndexPage, getAboutPage};