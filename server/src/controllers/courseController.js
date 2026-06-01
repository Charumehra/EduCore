const Course = require("../models/course");

// create a new course for the authenticated instructor
const createCourse = async (req, res) => {
  try {
    const { title, description, category, price, level } = req.body;

    const course = await Course.create({
      title,
      description,
      category,
      price,
      level,
      instructor: req.user.id,  // instructor ID comes from auth middleware
    });
    return res.status(201).json({
      success: true,
      course,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// get all courses with instructor information populated
const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find().populate("instructor", "name email");
    return res.status(200).json({
      success: true,
      totalCourses: courses.length,
      courses,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// get course details by ID with instructor information populated
const getCourseById = async (req, res) => {
  try {
    const courseId = req.params.id;

    const course = await Course.findById(courseId).populate(
      "instructor",
      "name email",
    );

    if (!course) {
     return res.status(404).json({ message: "Course not found" });
    }
    return res.status(200).json({
      success: true,
      course,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// update course details by ID (only instructor who created the course can update)
const updateCourse = async (req, res) => {
  try {
    const courseId = req.params.id;
    const courseUpdated = await Course.findByIdAndUpdate(courseId, req.body, {
      new: true,
    });

    if (!courseUpdated) {
      return res.status(404).json({ message: "Course not found" });
    }

    return res.status(200).json({
      success: true,
      course: courseUpdated,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// delete course by ID (only instructor who created the course can delete)
const deleteCourse = async (req, res) => {
  try {
    const courseId = req.params.id;

    const courseDeleted = await Course.findByIdAndDelete(courseId);

    if (!courseDeleted) {
      return res.status(404).json({ message: "Course not found" });
    }
    return res.status(200).json({
      success: true,
      message: "Course deleted successfully",
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createCourse,
  getAllCourses,
  getCourseById,
  updateCourse,
  deleteCourse
};
