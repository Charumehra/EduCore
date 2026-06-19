const { z } = require("zod");

const createCourseSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  price: z.number().nonnegative("Price must be 0 or greater"),
  category: z.string().min(2, "Category is required"),
  level: z.enum(["beginner", "intermediate", "advanced"]),
  duration: z.number().positive("Duration must be a positive number"),
  instructor: z.string().optional(),
});

const updateCourseSchema = z.object({
  title: z.string().min(5).optional(),
  description: z.string().min(10).optional(),
  price: z.number().nonnegative().optional(),
  category: z.string().optional(),
  level: z.enum(["beginner", "intermediate", "advanced"]).optional(),
});

module.exports = {
  createCourseSchema,
    updateCourseSchema,
};