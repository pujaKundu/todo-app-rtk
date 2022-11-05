import React, { useState } from "react";
import TickImage from "../assets/images/double-tick.png";
import {
  useAddTodoMutation,
  useDeleteTodoMutation,
  useEditTodoMutation,
} from "../features/api/apiSlice";
import swal from "sweetalert";

const Header = ({ todos }) => {
  const [addTodo, { data: newTodo, isLoading, isError, isSuccess }] =
    useAddTodoMutation();

  const [editTodo] = useEditTodoMutation();
  const [deleteTodo] = useDeleteTodoMutation();
  const [text, setText] = useState("");

  const reset = () => {
    setText("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addTodo({ text, completed: false, color: "" });
    swal("Todo added successfully!", { icon: "success" });
    reset();
  };

  const handleAllCompleted = () => {
    todos?.map((todo) =>
      editTodo({
        id: todo.id,
        data: {
          text: todo?.text,
          color: todo?.color,
          completed: true,
        },
      })
    );
  };

  const handleAllClear = () => {
    todos?.map((todo) => {
      if (todo.completed === true) {
        deleteTodo(todo.id);
      }
    });
  };

  return (
    <div className="mt-24">
      <form
        method="POST"
        onSubmit={handleSubmit}
        className="flex items-center bg-gray-100 px-4 py-4 rounded-md"
      >
        <input
          type="text"
          placeholder="Type your todo"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full text-lg px-4 py-1 border-none outline-none bg-gray-100 text-gray-500"
        />
      </form>

      <ul className="flex justify-between my-4 text-xs text-gray-500">
        <li
          className="flex space-x-1 cursor-pointer"
          onClick={handleAllCompleted}
        >
          <img className="w-4 h-4" src={TickImage} alt="Complete" />
          <span className="hover:font-bold text-green-600">
            Complete All Tasks
          </span>
        </li>
        <li
          className="cursor-pointer hover:font-bold text-red-900"
          onClick={handleAllClear}
        >
          <span>Clear completed</span>
        </li>
      </ul>
    </div>
  );
};

export default Header;
