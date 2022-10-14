const express = require(`express`)
const Controller = require("../controllers/controller")
const router = express.Router()

// define endpoint disini
// bisa difilter stocks yang masih ada lot yang masih bisa dibeli, sesuai bidang, risk, atau search by name
router.get(`/`,Controller.renderStocks)

router.post(`/:StockId/buy`,Controller.buyStock)
router.post(`/:StockId/update`,Controller.editStock)

// define endpoint disini
module.exports = router