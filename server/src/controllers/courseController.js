const Course = require("../models/course");

// create a new course for the authenticated instructor
const createCourse = async (req, res) => {
  try {
    if (req.user.role !== "instructor") {
      return res.status(403).json({
        message: "Only instructors can create courses",
      });
    }

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

// update course details by ID (only instructor who created the course can update)
const updateCourse = async (req, res) => {
  try {
    if (req.user.role !== "instructor") {
      return res.status(403).json({
        message: "Only instructors can update courses",
      });
    }
    const courseId = req.params.id;
    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({
        message: "Course not found",
      });
    }

    if (course.instructor.toString() !== req.user.id) {
      return res.status(403).json({
        message: "Access denied",
      });
    }

    const courseUpdated = await Course.findByIdAndUpdate(courseId, req.body, {
      new: true,
    });

    return res.status(200).json({
      success: true,
      course: courseUpdated,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

// delete course by ID (only instructor who created the course can delete)
const deleteCourse = async (req, res) => {
  try {
    if (req.user.role !== "instructor") {
      return res.status(403).json({
        message: "Only instructors can update courses",
      });
    }
    const courseId = req.params.id;

    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({
        message: "Course not found",
      });
    }

    if (course.instructor.toString() !== req.user.id) {
      return res.status(403).json({
        message: "Access denied",
      });
    }

    await Course.findByIdAndDelete(courseId);

    return res.status(200).json({
      success: true,
      message: "Course deleted successfully",
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
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

module.exports = {
  createCourse,
  updateCourse,
  deleteCourse,
  getAllCourses,
  getCourseById,
};
