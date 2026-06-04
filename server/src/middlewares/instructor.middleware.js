const authInstructor = (req, res, next) => {
if (req.user.role !== "instructor") {
return res.status(403).json({
success: false,
message: "Only instructors can perform this action",
});
}

next();
};

module.exports = { authInstructor };
