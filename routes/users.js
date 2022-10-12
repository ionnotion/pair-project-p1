const express = require(`express`)
const Controller = require("../controllers/controller")
const router = express.Router()

// define endpoint disini
router.get(`/:id`,Controller.renderUserHome)

//untuk ubah account detail/password
router.get(`/:id/edit`,Controller.renderEditUser)
router.post(`/:id/edit`,Controller.postEditUser)

// define endpoint disini
module.exports = router