const express = require("express");
const {
  createCourse,
  getAllCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
} = require("../controllers/course.controller");
const { authMiddleware } = require("../middlewares/auth.middleware");
const { authorizeRoles } = require("../middlewares/authorizeRoles.middleware");

const router = express.Router();

router.post("/create-course", authMiddleware, authorizeRoles, createCourse);
router.put("/:id", authMiddleware, authorizeRoles, updateCourse);
router.delete("/:id", authMiddleware, authorizeRoles, deleteCourse);
router.get("/all-courses", getAllCourses);
router.get("/:id", getCourseById);

module.exports = router;
