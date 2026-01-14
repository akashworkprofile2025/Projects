import { useEffect, useState } from "react";
import api from "../api/axios";
import TodoForm from "../components/TodoForm";
import TodoList from "../components/TodoList";

const Dashboard = () => {
  const [todos, setTodos] = useState([]);

  const fetchTodos = async () => {
    const res = await api.get("/todos");
    setTodos(res.data);
  };

  const addTodo = async (title) => {
    const res = await api.post("/todos", { title });
    setTodos([...todos, res.data]);
  };

  const toggleTodo = async (todo) => {
    const res = await api.put(`/todos/${todo._id}`, {
      completed: !todo.completed
    });
    setTodos(todos.map(t => t._id === todo._id ? res.data : t));
  };

  const deleteTodo = async (id) => {
    await api.delete(`/todos/${id}`);
    setTodos(todos.filter(t => t._id !== id));
  };

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div className="container mt-4 col-md-6">
      <div className="d-flex justify-content-between mb-3">
        <h3>My Todos</h3>
        <button className="btn btn-outline-danger" onClick={logout}>
          Logout
        </button>
      </div>

      <TodoForm addTodo={addTodo} />
      <TodoList
        todos={todos}
        toggleTodo={toggleTodo}
        deleteTodo={deleteTodo}
      />
    </div>
  );
};

export default Dashboard;
