import User from "../../models/schemas/userSchema.js";

export async function verifyUser(req, res, next) {
  const { email, subscription } = req.user;

  try {
    const id = req.user.id;
    const user = async (id) => {
      try {
        const user = await User.findById(id);
        if (!user) {
          return null;
        } else {
          return user;
        }
      } catch (error) {
        console.log(error);
      }
    };

    if (!user) {
      return res.json({
        status: "error",
        code: 401,
        data: {
          message: `Unauthorized`,
        },
      });
    } else {
      return res.json({
        status: "success",
        code: 200,
        data: {
          message: `Authorization successful`,
          email,
          subscription,
        },
      });
    }
  } catch (err) {
    console.error(err);
  }
}
