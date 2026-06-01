const express = require("express");
const {
  createCourse,
  getAllCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
} = require("../controllers/courseController");
const authMiddleware = require("../middlewares/auth");

const router = express.Router();

router.post("/create-course", authMiddleware, createCourse);
router.get("/all-courses", authMiddleware, getAllCourses);
router.get("/:id", authMiddleware, getCourseById);
router.put("/:id", authMiddleware, updateCourse);
router.delete("/:id", authMiddleware, deleteCourse);

module.exports = router;
