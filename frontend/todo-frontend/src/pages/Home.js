import { useEffect, useState } from "react";
import {
  getTodos,
  addTodo,
  deleteTodo,
  updateTodo,
} from "../api/todoApi";
import "../styles/Todo.css";

function Home() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState("");

  // Fetch todos on load
  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const res = await getTodos();
    setTodos(res.data);
  };

  // Add todo
  const handleAdd = async () => {
    if (!title.trim()) return;
    const res = await addTodo({ title });
    setTodos([...todos, res.data]);
    setTitle("");
  };

  // Delete todo
  const handleDelete = async (id) => {
    await deleteTodo(id);
    setTodos(todos.filter((todo) => todo._id !== id));
  };

  // Clear all todos
  const handleClearAll = async () => {
    for (let todo of todos) {
      await deleteTodo(todo._id);
    }
    setTodos([]);
  };

  // Save updated todo
  const handleUpdate = async (id) => {
    if (!editText.trim()) return;
    const res = await updateTodo(id, { title: editText });
    setTodos(
      todos.map((todo) =>
        todo._id === id ? res.data : todo
      )
    );
    setEditId(null);
    setEditText("");
  };

  return (
    <div className="todo-container">
      <h2>Todo App</h2>

      {/* Input */}
      <div className="input-group">
        <input
          type="text"
          placeholder="Add your new todo"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button className="add-btn" onClick={handleAdd}>
          +
        </button>
      </div>

      {/* Todo list */}
      <ul className="todo-list">
        {todos.map((todo) => (
          <li key={todo._id} className="todo-item">
            {editId === todo._id ? (
              <>
                <input
                  value={editText}
                  onChange={(e) =>
                    setEditText(e.target.value)
                  }
                />
                <button
                  className="save-btn"
                  onClick={() => handleUpdate(todo._id)}
                >
                  ✔
                </button>
              </>
            ) : (
              <>
                <span>{todo.title}</span>
                <div className="actions">
                  <button
                    className="edit-btn"
                    onClick={() => {
                      setEditId(todo._id);
                      setEditText(todo.title);
                    }}
                  >
                    ✏️
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() =>
                      handleDelete(todo._id)
                    }
                  >
                    ❌
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>

      {/* Footer */}
      <div className="footer">
        <span>
          You have {todos.length} pending tasks
        </span>
        <button
          className="clear-btn"
          onClick={handleClearAll}
        >
          Clear All
        </button>
      </div>
    </div>
  );
}

export default Home;







