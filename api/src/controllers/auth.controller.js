import User from "./../models/User";

export const createUser = async (req, res) => {
  try {
    const newUser = User.build({
      username: "Juan4",
      password: "juan123",
      email: "juan@mail.com4",
      type_user: "admin",
    });
    const result = await newUser.save();
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};
