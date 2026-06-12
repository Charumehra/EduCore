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
    const courses = await Course.find().populate("owner", "name");

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

const enrollCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const studentId = req.user.id;

    // Only students can enroll
    if (req.user.role !== "student") {
      return res.status(403).json({
        success: false,
        message: "Only students can enroll in courses",
      });
    }

    const course = await Course.findById(id);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    const alreadyEnrolled = course.enrolledStudents.some(
      (student) => student.toString() === studentId,
    );

    if (alreadyEnrolled) {
      return res.status(400).json({
        success: false,
        message: "You are already enrolled in this course",
      });
    }

    course.enrolledStudents.push(studentId);

    await course.save();

    return res.status(200).json({
      success: true,
      message: "Enrollment successful",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getEnrolledStudents = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id).populate(
      "enrolledStudents",
      "name email role",
    );

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    return res.status(200).json({
      success: true,
      totalStudents: course.enrolledStudents.length,
      students: course.enrolledStudents,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getMyCourses = async (req, res) => {
  try {
    const studentId = req.user.id;

    const courses = await Course.find({
      enrolledStudents: studentId,
    });

    return res.status(200).json({
      success: true,
      courses,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createCourse,
  updateCourse,
  deleteCourse,
  getAllCourses,
  getCourseById,
  enrollCourse,
  getEnrolledStudents,
  getMyCourses,
};
