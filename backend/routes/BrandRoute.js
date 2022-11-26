const express = require("express");
const {
    getAllBrands
} = require("../controller/BrandController");
const router = express.Router();

router.route("/brand").get(getAllBrands);



module.exports = router;
