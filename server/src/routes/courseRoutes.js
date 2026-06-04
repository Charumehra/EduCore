const express = require("express");
const {
  createCourse,
  getAllCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
} = require("../controllers/courseController");
const { authMiddleware } = require("../middlewares/auth.middleware");
const { authInstructor } = require("../middlewares/instructor.middleware");

const router = express.Router();

router.post("/create-course", authMiddleware, authInstructor, createCourse);
router.put("/:id", authMiddleware, authInstructor, updateCourse);
router.delete("/:id", authMiddleware, authInstructor, deleteCourse);
router.get("/all-courses", getAllCourses);
router.get("/:id", getCourseById);

module.exports = router;
