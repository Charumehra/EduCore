const express = require("express");
const {addLecture,getCourseLectures,deleteLecture,updateLecture,} = require("../controllers/lecture.controller");
const { authMiddleware } = require("../middlewares/auth.middleware");
const {authorizeRoles,authorizeOwnership,} = require("../middlewares/authorizeRoles.middleware");
const upload = require("../middlewares/upload.middleware");

const router = express.Router();


router.post("/create-lectures/:courseId",authMiddleware,authorizeRoles,authorizeOwnership,upload.single("video"),addLecture,);
router.get("/:courseId", authMiddleware, getCourseLectures);
router.put("/:courseId/:lectureId",authMiddleware,authorizeRoles,authorizeOwnership,upload.single("video"),updateLecture,);
router.delete("/:courseId/:lectureId",authMiddleware,authorizeRoles,authorizeOwnership,deleteLecture,);

module.exports = router;
