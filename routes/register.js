const express = require(`express`)
const Controller = require("../controllers/controller")
const router = express.Router()

// define endpoint disini
router.get(`/`,Controller.renderRegister)
router.post(`/`,Controller.postRegister)


// define endpoint disini
module.exports = router