const express = require(`express`)
const Controller = require("../controllers/controller")
const router = express.Router()

// define endpoint disini
// bisa difilter stocks yang masih ada lot yang masih bisa dibeli, sesuai bidang, risk, atau search by name
router.get(`/`,Controller.renderStocks)

// define endpoint disini
module.exports = router