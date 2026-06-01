const Course = require("../models/course");
const jwt = require("jsonwebtoken");

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
    res.status(500).json({ message: err.message });
  }
};

const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find().populate("instructor", "name email");
    return res.status(200).json({
      success: true,
      totalCourses: courses.length,
      courses,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

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
    res.status(200).json({
      success: true,
      course,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateCourse = async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      res.status(401).json({ message: "Unauthorized" });
    }
    jwt.verify(token, process.env.JWT_SECRET);

    const courseId = req.params.id;
    const courseUpdated = await Course.findByIdAndUpdate(courseId, req.body, {
      new: true,
    });

    if (!courseUpdated) {
      res.status(404).json({ message: "Course not found" });
    }

    res.status(200).json({
      success: true,
      course: courseUpdated,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteCourse = async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      res.status(401).json({ message: "Unauthorized" });
    }
    jwt.verify(token, process.env.JWT_SECRET);

    const courseId = req.params.id;

    const courseDeleted = await Course.findByIdAndDelete(courseId);

    if (!courseDeleted) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.status(200).json({
      success: true,
      message: "Course deleted successfully",
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createCourse,
  getAllCourses,
  getCourseById,
  updateCourse,
  deleteCourse
};
