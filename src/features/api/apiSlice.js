import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://redux-todo-data.herokuapp.com",
  }),
  tagTypes: ["Todos", "Todo"],
  endpoints: (builder) => ({
    filterTodos: builder.query({
      query: (arg) => {
        let queryString = "";
        if (arg?.colors?.length > 0) {
          queryString += arg.colors
            .map((color) => `color_like=${color}`)
            .join("&");
        }
        if (arg?.status !== "") {
          queryString += `&completed=${arg.status}`;
        }
        return {
          url: `/todos?${queryString}`,
        };
      },
      keepUnusedDataFor: 600,
      providesTags: ["Todos"],
    }),
    addTodo: builder.mutation({
      query: (data) => ({
        url: "/todos",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Todos"],
    }),
    editTodo: builder.mutation({
      query: ({ id, data }) => ({
        url: `/todos/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result, error, arg) => [
        "Todos",
        { type: "Todo", id: arg.id },
      ],
    }),

    deleteTodo: builder.mutation({
      query: (id) => ({
        url: `/todos/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Todos"],
    }),
  }),
});

export const {
  useFilterTodosQuery,
  useAddTodoMutation,
  useDeleteTodoMutation,
  useEditTodoMutation,
} = apiSlice;
