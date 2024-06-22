import axios from "axios"

export const getData = async()=>{
  const url = "http://localhost:3000/api/v1/tasks";
  try{
    const response = await axios.get(url);
    return response.data
  }catch(error){
    if (axios.isAxiosError(error)) {
      // Capture detailed error message from API response
      throw new Error(error.response?.data?.message || error.message);
    } else {
      throw new Error("An unknown error occurred");
    }
  }
}