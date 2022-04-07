import Task from "./../models/Task";

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
