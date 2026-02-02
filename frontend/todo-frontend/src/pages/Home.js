import { useEffect, useState } from "react";
import { getTodos } from "../api/todoApi";

function Home() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    getTodos()
      .then((res) => {
        setTodos(res.data);   // 👈 backend → frontend
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Todo Home Page</h2>

      <ul>
        {todos.map((todo) => (
          <li key={todo._id}>{todo.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default Home;


