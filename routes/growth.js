const express = require("express");
const router = express.Router();
const growthController = require("../controller/growthController");
const auth = require("../middleware/auth");

router.post("/createGrowthRecord", auth, growthController.createGrowthRecord);
router.get("/getGrowthRecords", auth, growthController.getGrowthRecords);
router.get(
  "/getLatestGrowthRecord/:child_id",
  auth,
  growthController.getLatestGrowthRecordByChild
);
router.get(
  "/getAllRecordById/:child_id",
  auth,
  growthController.getAllGrowthRecordsByChild
);

router.get("/getGrowthStats", auth, growthController.getGrowthStats);

module.exports = router;
