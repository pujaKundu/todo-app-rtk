import React, { useState } from "react";
import cancelImage from "../assets/images/cancel.png";
import {
  useDeleteTodoMutation,
  useEditTodoMutation,
} from "../features/api/apiSlice";
import EditForm from "./EditForm";
import swal from "sweetalert";

const Todo = ({ todo }) => {
  const { id, text, completed, color } = todo;

  const [isOpen, setIsOpen] = useState(false);
  const [deleteTodo] = useDeleteTodoMutation();

  const [editTodo] = useEditTodoMutation();
  const [status, setStatus] = useState(!completed);

  const handleDelete = () => {
    swal("Todo deleted!", { icon: "warning" });
    if (id) deleteTodo(id);
  };

  const openModal = () => {
    setIsOpen(!isOpen);
  };

  const handleStatus = (e) => {
    e.preventDefault();
    setStatus(e.target.checked);
    editTodo({
      id,
      data: { text, completed: status, color },
    });
  };

  const handleColor = (clr) => {
    editTodo({
      id,
      data: { text, completed, color: clr },
    });
  };

  return (
    <div className="flex justify-start items-center p-2 hover:bg-gray-100 hover:transition-all space-x-4 border-b border-gray-400/20 last:border-0">
      <div className="rounded-full bg-white border-2 border-gray-400 w-5 h-5 flex flex-shrink-0 justify-center items-center mr-2  focus-within:border-green-500 ">
        <input
          checked={status}
          onChange={handleStatus}
          type="checkbox"
          className="opacity-0 absolute rounded-full"
        />

        {completed && (
          <svg
            className="fill-current w-3 h-3 text-green-500 pointer-events-none"
            viewBox="0 0 20 20"
          >
            <path d="M0 11l2-2 5 5L18 3l2 2L7 18z" />
          </svg>
        )}
      </div>

      <div className={`select-none flex-1 text-justify ${completed && 'text-green-500 font-bold'}`}>{text}</div>
      {isOpen === true ? <EditForm todo={todo} /> : ""}
      <div
        className={`flex-shrink-0 h-4 w-4 rounded-full border-2 ml-auto cursor-pointer hover:bg-green-500 border-green-500 ${
          color === "green" && "bg-green-500"
        }`}
        onClick={() => handleColor("green")}
      ></div>

      <div
        className={`flex-shrink-0 h-4 w-4 rounded-full border-2 ml-auto cursor-pointer hover:bg-yellow-500 border-yellow-500 ${
          color === "yellow" && "bg-yellow-500"
        }`}
        onClick={() => handleColor("yellow")}
      ></div>

      <div
        className={`flex-shrink-0 h-4 w-4 rounded-full border-2 ml-auto cursor-pointer hover:bg-red-500 border-red-500 ${
          color === "red" && "bg-red-500"
        }`}
        onClick={() => handleColor("red")}
      ></div>
      <img
        src="https://cdn-icons-png.flaticon.com/128/181/181540.png"
        alt="edit"
        className="flex-shrink-0 w-4 h-4 ml-2 cursor-pointer"
        onClick={openModal}
      />
      <img
        onClick={handleDelete}
        src={cancelImage}
        className="flex-shrink-0 w-4 h-4 ml-2 cursor-pointer"
        alt="Cancel"
      />
    </div>
  );
};

export default Todo;
