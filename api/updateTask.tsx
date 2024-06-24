import axios from "axios";

export const updateTask = async (id: any, updateData: any) => {
  const url = `https://task-manager-node-js.onrender.com/api/v1/tasks/${id}`;
  try {
    const response = await axios.put(url, updateData);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Capture detailed error message from API response
      throw new Error(error.response?.data?.message || error.message);
    } else {
      throw new Error("An unknown error occurred");
    }
  }
};
