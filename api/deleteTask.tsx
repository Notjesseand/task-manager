import axios from "axios";

export const deleteTask = async (id: any) => {
  const url = `https://task-manager-node-js.onrender.com/api/v1/tasks/${id}`;
  try {
    await axios.delete(url);
    return "Task Deleted";
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Capture detailed error message from API response
      throw new Error(error.response?.data?.message || error.message);
    } else {
      throw new Error("An unknown error occurred");
    }
  }
};
