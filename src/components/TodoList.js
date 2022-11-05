import React from "react";
import {
  useFilterTodosQuery,
} from "../features/api/apiSlice";
import Todo from "./Todo";
import Header from "./Header";
import Footer from "./Footer";
import { useSelector } from "react-redux";

const TodoList = () => {
  const { colors, status } = useSelector((state) => state.filter);
  const { data: todos, isLoading, isError } = useFilterTodosQuery({colors,status});
  let content = null;
  if (isLoading) {
    content = (
      <p>
        {" "}
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
      </p>
    );
  }
  if (!isLoading && isError) {
    content = <p>There was an error</p>;
  }

  if (!isLoading && !isError && todos?.length === 0) {
    content = <p>No todo found</p>;
  }

  if (!isLoading && !isError && todos?.length > 0) {
    content = todos.map((todo) => <Todo key={todo.id} todo={todo} />);
  }
  return (
    <div
      div
      className="ml-52 mr-52 mt-2 text-gray-700 text-sm max-h-[500px] overflow-y-auto mb-5"
    >
      <Header todos={todos} />
      {content}
     
    </div>
  );
};

export default TodoList;
