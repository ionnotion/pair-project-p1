const express = require(`express`)
const Controller = require("../controllers/controller")
const router = express.Router()

// define routing lain disini
const loginRoutes = require(`./login`)
const registerRoutes = require(`./register`)

const usersRoutes = require(`./users`) 
const stocksRoutes = require(`./stocks`) 
const companiesRoutes = require(`./companies`)

const investmentsRoutes = require(`./investments`)
// define routing lain disini


// define endpoint lain disin
//landing page isinya fluff (welcome bla bla) dan button untuk login dan register aja ya?
router.get(`/`, Controller.landingPage)

router.get(`/testing`, Controller.test)

router.use(`/login`, loginRoutes)
router.use(`/register`, registerRoutes)

router.use((req,res,next) => {
    if(!req.session.UserId) {
        let message =`You need to login first!`
        res.redirect(`/login?message=${message}`)
    } else next()
})

router.use(`/users`, usersRoutes)
router.use(`/stocks`, stocksRoutes)
router.use(`/companies`, companiesRoutes)

// router.use(`/investments`, investmentsRoutes)

// define endpoint lain disini
module.exports = router