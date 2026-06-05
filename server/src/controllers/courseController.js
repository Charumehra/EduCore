const Course = require("../models/course");

// Create a new course
const createCourse = async (req, res) => {
  try {
    const { title, description, category, price, level } = req.body;

    const course = await Course.create({
      title,
      description,
      category,
      price,
      level,
      instructor: req.user.id,
    });

    return res.status(201).json({
      success: true,
      course,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

// Update course
const updateCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({
        message: "Course not found",
      });
    }

    // Only the course creator can update
    if (course.instructor.toString() !== req.user.id) {
      return res.status(403).json({
        message: "Access denied",
      });
    }

    const updatedCourse = await Course.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    return res.status(200).json({
      success: true,
      course: updatedCourse,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

// Delete course
const deleteCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({
        message: "Course not found",
      });
    }

    // Only the course creator can delete
    if (course.instructor.toString() !== req.user.id) {
      return res.status(403).json({
        message: "Access denied",
      });
    }

    await Course.findByIdAndDelete(req.params.id);

    return res.status(200).json({
      success: true,
      message: "Course deleted successfully",
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
  
// Get all courses
const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find().populate(
      "instructor",
      "name email"
    );

    return res.status(200).json({
      success: true,
      totalCourses: courses.length,
      courses,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

// Get single course by ID
const getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id).populate(
      "instructor",
      "name email"
    );

    if (!course) {
      return res.status(404).json({
        message: "Course not found",
      });
    }

    return res.status(200).json({
      success: true,
      course,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};
};

module.exports = {
  createCourse,
  updateCourse,
  deleteCourse,
  getAllCourses,
  getCourseById
};