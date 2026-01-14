import { useState } from "react";
import '../UI/TodoForm.css'
const TodoForm = ({ addTodo }) => {
  const [title, setTitle] = useState("");

  const submit = (e) => {
    e.preventDefault();
    addTodo(title);
    setTitle("");
  };

  return (
    <form onSubmit={submit} className="d-flex gap-2">
      <input className="form-control"
        placeholder="New Todo"
        value={title}
        onChange={(e) => setTitle(e.target.value)} />
      <button className="btn btn-primary rotate-center">
        <i className="bi bi-plus-lg "></i>
      </button>
    </form>
  );
};

export default TodoForm;
