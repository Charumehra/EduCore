const Course = require("../models/course");
const {
  uploadImage,
  uploadVideo,
  deleteMedia,
} = require("../services/storage.service");

// Create a new course
const createCourse = async (req, res) => {
  try {
    const { title, description, category, price, level } = req.body;

    const existingCourse = await Course.findOne({ title });

    if (existingCourse) {
      return res.status(400).json({
        message: "Course already exists",
      });
    }

    let thumbnailData = {
      url: "",
      publicId: "",
    };

    if (req.file) {
      thumbnailData = await uploadImage(req.file.path, "educore/courses");
    }

    const course = await Course.create({
      title,
      description,
      category,
      price,
      level,
      owner: req.user.id,

      thumbnail: thumbnailData.url,
      thumbnailPublicId: thumbnailData.publicId,
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
    const updatedCourse = await Course.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
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
    const deletedCourse = await Course.findByIdAndDelete(req.params.id);

    return res.status(200).json({
      success: true,
      message: "Course deleted successfully",
      course: deletedCourse,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

// Get all courses
const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find({
      owner: req.user.id,
    });

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
      "owner",
      "name email",
    );
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

module.exports = {
  createCourse,
  updateCourse,
  deleteCourse,
  getAllCourses,
  getCourseById,
};
