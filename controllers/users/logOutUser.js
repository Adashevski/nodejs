export async function logOutUser(req, res, next) {
  const { user } = req;

  try {
    user.token = null;
    await user.save();

    return res.status(204).send();
  } catch (error) {
    return res.status(401).json({
      status: "Unauthorized",
      code: 401,
      message: `Not authorized`,
    });
  }
}
