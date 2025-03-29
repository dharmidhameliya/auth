export const isAdmin = async (req, res, next) => {
  try {
    const user = req.user;
    console.log(user);
    if (!user.isadmin) {
      return res
        .status(403)
        .json({ message: "Access denied. Admin privileges required." });
    }

    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ message: "Unauthorized" });
  }
};
