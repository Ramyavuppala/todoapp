import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

export const getTodos = () => API.get("/todos");
export const createTodo = (data) => API.post("/todos", data);
