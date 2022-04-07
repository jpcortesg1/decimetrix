import Task from "./../models/Task";

export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.findAll();
    res.status(200).json(tasks);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

export const getTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findAll({
      where: {
        assigned_to: id,
      },
    });
    res.status(200).json(task);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

export const createTask = async (req, res) => {
  try {
    const { message, status, createdBy, assignedTo } = req.body;
    const params = {
      message,
      status,
      created_by: createdBy,
      assigned_to: assignedTo,
    };
    const newTask = Task.build(params);
    const task = await newTask.save();
    return res.status(200).json(task);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};
