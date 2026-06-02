const express = require("express");
const {
  createCourse,
  getAllCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
} = require("../controllers/courseController");
const authMiddleware = require("../middlewares/auth.middleware");
const instructorMiddleware = require("../middlewares/instructor.middleware");

const router = express.Router();

router.post("/create-course",authMiddleware, instructorMiddleware, createCourse);
router.put("/:id",authMiddleware, instructorMiddleware, updateCourse);
router.delete("/:id",authMiddleware, instructorMiddleware, deleteCourse);
router.get("/all-courses", getAllCourses);
router.get("/:id", getCourseById);

module.exports = router;
