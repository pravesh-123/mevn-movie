/**
 * CreatedBy:Pravesh
 * Created Date:15-12-2021
 */

const express = require("express");
const router = express.Router();
const apiController = require("../controllers/api");
const multer = require("multer");

// multer middleware
let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
  },
});

let upload = multer({
  storage: storage,
}).single("image");

router.get("/", apiController.getAllPost);
router.get("/:id", apiController.getPostById);
router.post("/", upload, apiController.createPost);
router.patch("/:id", upload, apiController.updatePost);
router.delete("/:id", apiController.deletePost);

module.exports = router;
