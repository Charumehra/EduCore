const Course = require("../models/course");
const Lecture = require("../models/lecture");
const { uploadVideo, deleteMedia } = require("../services/storage.service");

const addLecture = async (req, res) => {
  try {
    const { title, duration , description} = req.body;

    const course = await Course.findById(req.params.courseId);

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Lecture video is required",
      });
    }

    const videoData = await uploadVideo(req.file.path, "educore/lectures");

    const lecture = await Lecture.create({
      title,
      duration,
      description,
      videoUrl: videoData.url,
      publicId: videoData.publicId,
    });

    course.lectures.push(lecture._id);

    await course.save();

    return res.status(201).json({
      success: true,
      message: "Lecture added successfully",
      lecture,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getCourseLectures = async (req, res) => {
  try {
    const course = await Course.findById(req.params.courseId).populate(
      "lectures",
    );

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    return res.status(200).json({
      success: true,
      lectures: course.lectures,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteLecture = async (req, res) => {
  try {
    const { courseId, lectureId } = req.params;

    const lecture = await Lecture.findById(lectureId);

    if (!lecture) {
      return res.status(404).json({
        success: false,
        message: "Lecture not found",
      });
    }

    await deleteMedia(lecture.publicId, "video");

    await Course.findByIdAndUpdate(courseId, {
      $pull: {
        lectures: lectureId,
      },
    });

    await Lecture.findByIdAndDelete(lectureId);

    return res.status(200).json({
      success: true,
      message: "Lecture deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateLecture = async (req, res) => {
  try {
    const { title, duration } = req.body;

    const lecture = await Lecture.findById(req.params.lectureId);

    if (!lecture) {
      return res.status(404).json({
        success: false,
        message: "Lecture not found",
      });
    }

    // Update text fields
    if (title) lecture.title = title;
    if (duration) lecture.duration = duration;

    // If a new video is uploaded
    if (req.file) {
      // Delete old video from Cloudinary
      if (lecture.publicId) {
        await deleteMedia(lecture.publicId, "video");
      }

      // Upload new video
      const videoData = await uploadVideo(req.file.path, "educore/lectures");

      lecture.videoUrl = videoData.url;
      lecture.publicId = videoData.publicId;
    }

    await lecture.save();

    return res.status(200).json({
      success: true,
      message: "Lecture updated successfully",
      lecture,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  addLecture,
  getCourseLectures,
  deleteLecture,
  updateLecture,
};
