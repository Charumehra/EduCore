const express = require("express");
const {
  createCourse,
  getAllCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
  addLecture,
  getLectures
} = require("../controllers/courseController");

const router = express.Router();

router.post("/create-course", createCourse);
router.get("/all-courses", getAllCourses);
router.get("/:id", getCourseById);
router.put("/:id", updateCourse);
router.delete("/:id", deleteCourse);
router.post("/:id/add-lecture", addLecture);
router.get("/:id/lectures", getLectures);
module.exports = router;
