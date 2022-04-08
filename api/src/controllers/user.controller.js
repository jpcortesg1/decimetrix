import User from "./../models/User";
import fs from "fs";

export const getUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

export const getUsersOperators = async (req, res) => {
  try {
    const users = await User.findAll({
      where: {
        type_user: "operator",
      },
    });
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

export const putUser = async (req, res) => {
  try {
    const { id } = req.params;
    let photo;
    if (req.files) {
      const files = req.files;
      photo = files.photo;
    }
    const { username, email, password } = req.body;
    const paramsUpdate = {
      username,
      email,
    };
    if (photo) {
      console.log(photo);
      paramsUpdate.image = `${photo.tempFilePath}${photo.name}`;
      fs.renameSync(photo.tempFilePath, `${photo.tempFilePath}${photo.name}`);
    }
    if (password) {
      paramsUpdate.password = await User.hashPassword(password);
    }
    await User.update(paramsUpdate, {
      where: { id },
    });
    return res.status(200).json(paramsUpdate);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await User.destroy({
      where: {
        id,
      },
    });
    return res.status(200).json("User deleted");
  } catch (error) {
    return res.status(500).json(error.message);
  }
};
