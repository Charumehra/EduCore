const Course = require("../models/course");

const authorizeRoles = (req, res, next) => {
  if (req.user.role !== "admin" && req.user.role !== "instructor") {
    return res.status(403).json({
      success: false,
      message: "Only admins and instructors can perform this action",
    });
  }

  return next();
};

const authorizeOwnership = async (req, res, next) => {
  try {
    const course = await Course.findById(req.params.id || req.params.courseId);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    const isOwner = course.owner.toString() === req.user.id;

    if (req.user.role !== "admin" && !isOwner) {
      return res.status(403).json({
        success: false,
        message: "You do not have permission to perform this action",
      });
    }
    return next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = { authorizeRoles, authorizeOwnership };
