const express = require("express");
const router = express.Router();
const childrenController = require("../controller/childrenController");
const auth = require("../middleware/auth");

router.get("/getAllChildrenData", auth, childrenController.getAllChildrenData);
router.get("/getAllChildren", auth, childrenController.getAllChildren);
router.get("/getChildById/:id", auth, childrenController.getChildById);
router.post("/createChild", auth, childrenController.createChild);

module.exports = router;
