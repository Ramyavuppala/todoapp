import axios from "axios";

// 🔹 Backend base URL
const API_URL = "http://localhost:5000/api/todos";

// Get all todos
export const getTodos = () => axios.get(API_URL);

// Add new todo
export const addTodo = (data) => axios.post(API_URL, data);

// Delete todo
export const deleteTodo = (id) =>
  axios.delete(`${API_URL}/${id}`);

// Update todo
export const updateTodo = (id, data) =>
  axios.put(`${API_URL}/${id}`, data);



