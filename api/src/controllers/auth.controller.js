import User from "./../models/User";

export const createUser = async (req, res) => {
  try {
    const { newUser: params } = req.body;
    const newUser = User.build(params);
    await newUser.hashPassword();
    const user = await newUser.save();
    return res.status(200).json(newUser);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};
