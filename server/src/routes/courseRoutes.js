const express = require("express");
const {createCourse,getAllCourses,getCourseById,updateCourse,deleteCourse,enrollCourse, getMyCourses, getEnrolledStudents, getCourseForLearning, getMyCreatedCourses} = require("../controllers/course.controller");
const { authMiddleware } = require("../middlewares/auth.middleware");
const {authorizeRoles,authorizeOwnership,} = require("../middlewares/authorizeRoles.middleware");
const upload = require("../middlewares/upload.middleware");

const router = express.Router();


router.post("/create-course", authMiddleware, authorizeRoles,upload.single("thumbnail"), createCourse);
router.get("/all-courses", authMiddleware, getAllCourses);
router.get("/course/:id", authMiddleware, authorizeOwnership, getCourseById);
router.put("/update-course/:id",authMiddleware,authorizeRoles,authorizeOwnership,updateCourse,);
router.delete("/delete-course/:id",authMiddleware,authorizeRoles,authorizeOwnership,deleteCourse,);


//for enrollment and student management
router.post("/:id/enroll",authMiddleware,enrollCourse);
router.get("/my-courses",authMiddleware,getMyCourses);
router.get("/:id/students",authMiddleware,authorizeOwnership,getEnrolledStudents);
router.get("/:id/learn",authMiddleware,getCourseForLearning);
router.get("/my-created-courses", authMiddleware, getMyCreatedCourses);

module.exports = router;
