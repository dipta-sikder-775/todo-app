import qs from "query-string";
import { apiSlice } from "@redux/apiSlice";
import {
  type IAddTodoArgs,
  IAddTodoRes,
  IDeleteTodoRes,
  TDeleteTodoArg,
  IEditTodoArgs,
  IEditTodoRes,
  IGetTodosArgs,
  IGetTodosRes,
} from "@ts/todo";

export const todoApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTodos: builder.query<IGetTodosRes, IGetTodosArgs>({
      query: (args) => {
        let queryString = qs.stringify(args ?? "");
        queryString = queryString ? `?${queryString}` : "";

        // let queryString = "";
        // if (status === "Incomplete") {
        //   queryString += `&completed=false`;
        // }
        // if (status === "Complete") {
        //   queryString += `&completed=true`;
        // }
        // if (colors.length > 0) {
        //   colors.forEach((color) => {
        //     queryString += `&color=${color}`;
        //   });
        // }
        // return `/todos?_sort=id&_order=desc${queryString}`;
        return `/todos${queryString}`;
      },

      keepUnusedDataFor: 600,
      providesTags: ["Todos"],
    }),

    addTodo: builder.mutation<IAddTodoRes, IAddTodoArgs>({
      query: (todo) => ({
        url: "/todos",
        method: "POST",
        body: todo,
      }),
      invalidatesTags: ["Todos"],
    }),

    editTodo: builder.mutation<IEditTodoRes, IEditTodoArgs>({
      query: ({ id, data }) => ({
        url: `/todos/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Todos"],
    }),

    deleteTodo: builder.mutation<IDeleteTodoRes, TDeleteTodoArg>({
      query: (id) => ({
        url: `/todos/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Todos"],
    }),
  }),
});

export const {
  useAddTodoMutation,
  useDeleteTodoMutation,
  useEditTodoMutation,
  useGetTodosQuery,
} = todoApi;
