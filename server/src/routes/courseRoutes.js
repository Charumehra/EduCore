const express = require("express");
const {createCourse,getAllCourses,getCourseById,updateCourse,deleteCourse} = require("../controllers/course.controller");
const { authMiddleware } = require("../middlewares/auth.middleware");
const {authorizeRoles,authorizeOwnership,} = require("../middlewares/authorizeRoles.middleware");
const upload = require("../middlewares/upload.middleware");

const router = express.Router();


router.post("/create-course", authMiddleware, authorizeRoles,upload.single("thumbnail"), createCourse);
router.get("/all-courses", authMiddleware, getAllCourses);
router.get("/course/:id", authMiddleware, authorizeOwnership, getCourseById);
router.put("/update-course/:id",authMiddleware,authorizeRoles,authorizeOwnership,updateCourse,);
router.delete("/delete-course/:id",authMiddleware,authorizeRoles,authorizeOwnership,deleteCourse,);

module.exports = router;
