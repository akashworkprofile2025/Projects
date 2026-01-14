const TodoList = ({ todos, toggleTodo, deleteTodo }) => {
  return (
    <ul className="list-group mt-3">
      {todos.map((todo) => (
        <li key={todo._id}
          className="list-group-item d-flex justify-content-between">
          <span
            style={{ textDecoration: todo.completed ? "line-through" : "" }}
            onClick={() => toggleTodo(todo)}
          >
            {todo.title}
          </span>
          <button className="btn btn-danger btn-sm"
            onClick={() => deleteTodo(todo._id)}>
            <i className="bi bi-trash"></i>
          </button>
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
