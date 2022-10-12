const express = require(`express`)
const Controller = require("../controllers/controller")
const router = express.Router()

// define routing lain disini
const loginRoutes = require(`./login`)
const registerRoutes = require(`./register`)

const companiesRoutes = require(`./companies`)
const stocksRoutes = require(`./stocks`) 
const usersRoutes = require(`./users`) 

const investmentsRoutes = require(`./investments`)
// define routing lain disini


// define endpoint lain disini
//landing page isinya fluff (welcome bla bla) dan button untuk login dan register aja ya?
router.use(`/`, (req,res) => res.send(`homepage`))

router.use(`/login`, loginRoutes)
router.use(`/register`, registerRoutes)

router.use(`/companies`, companiesRoutes)
router.use(`/stocks`, stocksRoutes)
router.use(`/users`, usersRoutes)

router.use(`/investments`, investmentsRoutes)

// define endpoint lain disini