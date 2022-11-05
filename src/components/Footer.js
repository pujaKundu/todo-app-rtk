import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  useFilterTodosQuery,
} from "../features/api/apiSlice";
import { colorChanged, statusChanged } from "../features/filter/filterSlice";

const Footer = () => {
  const dispatch = useDispatch();
  const { colors, status } = useSelector((state) => state.filter);
  const { data: todos, isLoading, isError } = useFilterTodosQuery({colors,status});

  const noOfIncompleted = () => {
    let count = 0;
    todos?.map((todo) => {
      if (!todo.completed) count++;
    });
    return count;
  };
  let cnt = noOfIncompleted();

  const handleStatus = (status) => {
    dispatch(statusChanged(status));
  };

  const handleColor = (color) => {
    dispatch(colorChanged(color));
  };

  return (
    <div className="ml-52 mr-52 mt-4 flex justify-between text-xs text-gray-500">
      <p>
        {" "}
        {cnt > 0 ? (
          <span className="font-bold text-red-500">{cnt} tasks left</span>
        ) : (
          <span className="font-bold text-green-500">No tasks left</span>
        )}
      </p>
      <ul className="flex space-x-1 items-center text-xs">
        <li
          className="cursor-pointer font-bold"
          onClick={() => handleStatus("All")}
        >
          All
        </li>
        <li>|</li>
        <li
          className="cursor-pointer"
          onClick={() => handleStatus("Incomplete")}
        >
          Incomplete
        </li>
        <li>|</li>
        <li className="cursor-pointer" onClick={() => handleStatus("Complete")}>
          Complete
        </li>
        <li></li>
        <li></li>
        <li
          className={`h-3 w-3 border-2 border-green-500 md:hover:bg-green-500 rounded-full cursor-pointer ${
            colors.includes("green") && " bg-green-500"
          }`}
          onClick={() => handleColor("green")}
        ></li>
        <li
          className={`h-3 w-3 border-2 border-red-500 md:hover:bg-red-500 rounded-full cursor-pointer ${
            colors.includes("red") && " bg-red-500"
          }`}
          onClick={() => handleColor("red")}
        ></li>
        <li
          className={`h-3 w-3 border-2 border-yellow-500 md:hover:bg-yellow-500 rounded-full cursor-pointer ${
            colors.includes("yellow") && " bg-yellow-500"
          }`}
          onClick={() => handleColor("yellow")}
        ></li>
      </ul>
    </div>
  );
};

export default Footer;
