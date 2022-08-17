import { ReactEventHandler } from "react";
import { Todo, Todos } from "../types";

type TodosListProps = {
  showTodos: Todos;
  chgCheck: ReactEventHandler<Element>;
  removeTodo: ReactEventHandler<Element>;
};

const TodosList = (props: TodosListProps) => {
  const { showTodos, chgCheck, removeTodo } = props;

  return (
    <ul className="todoList_item">
      {showTodos?.map((todo: Todo, i: number) => (
        <li key={todo.content}>
          <label className="todoList_label">
            <input
              className="todoList_input"
              type="checkbox"
              aria-valuenow={i}
              onChange={chgCheck}
              checked={todo.isChecked}
            />
            <span>{todo.content}</span>
          </label>
          <a href="#">
            <i
              className="fa fa-times"
              aria-label={todo.content}
              onClick={removeTodo}
            ></i>
          </a>
        </li>
      ))}
    </ul>
  );
};

export default TodosList;