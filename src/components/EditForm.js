import React, { useState } from "react";
import { useEditTodoMutation } from "../features/api/apiSlice";

const EditForm = ({ todo }) => {
  const { id, text: initialText } = todo;
  const [editTodo] = useEditTodoMutation();

  const [text, setText] = useState(initialText);

  const handleSubmit = (e) => {
    e.preventDefault();
    editTodo({
      id,
      data: { text },
    });
  };
  return (
    <div>
      <form
        method="POST"
        onSubmit={handleSubmit}
        className="flex items-center bg-gray-100 px-4 py-4 rounded-md"
      >
        <input
          type="text"
          placeholder="Edit your todo"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full text-lg px-4 py-1 border-none outline-none bg-gray-300 text-gray-500"
        />
        <button className="bg-blue-500 text-white p-2 ml-2 hover:bg-blue-700">Update</button>
      </form>
    </div>
  );
};

export default EditForm;
