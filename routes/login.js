const express = require(`express`)
const Controller = require("../controllers/controller")
const router = express.Router()

// define endpoint disini
router.get(`/`,Controller.renderLogin)
router.post(`/`,Controller.postLogin)

router.get(`/forget`,Controller.renderForgetPassword)
router.post(`/forget`,Controller.postForgetPassword)

// define endpoint disini
module.exports = router