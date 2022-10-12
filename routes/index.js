const express = require(`express`)
const Controller = require("../controllers/controller")
const router = express.Router()

// define routing lain disini
const loginRoutes = require(`./login`)
const registerRoutes = require(`./register`)

const companiesRoutes = require(`./companies`)
const usersRoutes = require(`./users`) 

const investmentsRoutes = require(`./investments`)
// define routing lain disini

router.use(`/`, (req,res) => res.send(`homepage`))
//landing page isinya fluff dan button untuk login dan register aja ya?
Controller
// define endpoint lain disini

// router.use...

// define endpoint lain disini