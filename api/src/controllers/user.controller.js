import User from "./../models/User";

export const getUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findOne({
      where: { id },
    });
    res.status(200).json(user);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};
