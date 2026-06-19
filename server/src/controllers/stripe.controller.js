const stripe = require("../config/stripe");
const Course = require("../models/course");

const createCheckoutSession = async (req, res) => {
  try {
    const { courseId } = req.body;

    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",

      line_items: [
        {
          price_data: {
            currency: "inr",
            product_data: {
              name: course.title,
              description: course.description,
              images: [course.thumbnail],
            },
            unit_amount: course.price * 100,
          },
          quantity: 1,
        },
      ],

      success_url: `${process.env.CLIENT_URL}/payment-success?courseId=${course._id}`,
      cancel_url: `${process.env.CLIENT_URL}/course/${course._id}`,
      metadata: {
        userId: req.user.id,
        courseId: course._id.toString(),
      },
    });

    res.json({ url: session.url });
  } catch (error) {
    res.status(500).json({ success: false,
       message: error.message });
  }
};

module.exports = { createCheckoutSession };