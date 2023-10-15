// import tickImage from '../assets/images/double-tick.png';
// import noteImage from "../assets/images/notes.png";
// import plusImage from "../assets/images/plus.png";
import { useState } from "react";
import { toast } from "react-hot-toast";
import {
  useAddTodoMutation,
  useDeleteTodoMutation,
  useEditTodoMutation,
  useGetTodosQuery,
} from "@redux/features/todo/todoApi";
import {
  selectFilterReducer,
  setSearchTodo,
} from "@redux/features/filter/filterSlice";
import { useAppDispatch, useAppSelector } from "@redux/hooks";
import { HiOutlineSearch } from "react-icons/hi";
import { CgAdd } from "react-icons/cg";
import debounceFn from "@utils/debounceFn";

export default function Header() {
  const [input, setInput] = useState("");

  const { _order, _sort, color, completed, text_like } =
    useAppSelector(selectFilterReducer);
  const { data: todos } = useGetTodosQuery({
    _order,
    _sort,
    completed,
  });

  const [addTodo] = useAddTodoMutation();
  const [editTodo] = useEditTodoMutation();
  const [deleteTodo] = useDeleteTodoMutation();
  const dispatch = useAppDispatch();

  const handleInput: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setInput(e.target.value);
  };

  const submitHandler: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    try {
      toast.loading("Creating a todo", { id: "addTodo" });
      await addTodo({ text: input, completed: false }).unwrap();
      toast.success("Todo created successfully", { id: "addTodo" });
      setInput("");
    } catch (error) {
      toast.error("Failed to add todo.", { id: "addTodo" });
    }
  };

  const completeHandler = async () => {
    try {
      const incompleteTodos = todos?.filter((todo) => !todo.completed) ?? [];
      toast.loading("Executing complete tasks.", { id: "completeTasks" });

      for (const todo of incompleteTodos) {
        await editTodo({ id: todo.id, data: { completed: true } }).unwrap();
      }

      toast.success("Complete tasks executed successfully.", {
        id: "completeTasks",
      });
      // .forEach((todo) => {
      //   editTodo({ id: todo.id, data: { completed: true } }).unwrap();
      // });
    } catch (error) {
      toast.error("Failed to execute complete tasks.", { id: "completeTasks" });
    }
  };

  const handleClearCompleted = async () => {
    try {
      toast.loading("Executing clear completed", { id: "clearCompleted" });

      for (const { id, completed } of todos ?? []) {
        if (completed) {
          await deleteTodo(id).unwrap();
        }
      }

      toast.success("Clear completed executed successfully.", {
        id: "clearCompleted",
      });
    } catch (error) {
      toast.error("Failed to execute clear completed.");
    }

    // todos?.forEach((todo) => {
    //   const { id, completed } = todo;
    //   if (completed) {
    //     await deleteTodo(id).unwrap();
    //   }
    // });
  };

  const handleSearch = debounceFn<React.ChangeEventHandler<HTMLInputElement>>(
    ({ target: { value } }) => {
      dispatch(setSearchTodo(value));
    },
    800,
  );

  return (
    <div>
      <form
        className="flex items-center rounded-md bg-gray-100 px-4 py-4"
        onSubmit={submitHandler}
      >
        <img
          src="/assets/images/notes.svg"
          className="h-6 w-6 shrink-0"
          alt="Notes icon"
        />

        <input
          type="text"
          placeholder="Type your todo"
          className="w-full border-none bg-gray-100 px-4 py-1 text-lg text-gray-800 outline-none placeholder:text-gray-600"
          value={input}
          onChange={handleInput}
          required
        />

        <button
          type="submit"
          className="shrink-0"
        >
          <CgAdd className="ml-1 h-8 w-8" />
          <span className="sr-only">submit</span>
        </button>
      </form>

      <ul className="my-4 flex justify-between text-xs text-gray-500">
        <li className="flex cursor-pointer space-x-1" onClick={completeHandler}>
          <img
            className="h-4 w-4"
            src="/assets/images/double-tick.svg"
            alt="Complete"
          />

          <div className="relative">
            <span className="group">
              Complete All Tasks
              <div className="absolute -left-12 -top-20 hidden w-[300px] bg-white p-4 shadow-md group-hover:block">
                This option is not supported by json-server.
                <br />
                So implemented by loop
              </div>
            </span>
          </div>
        </li>

        <li className="cursor-pointer" onClick={handleClearCompleted}>
          <div className="relative">
            <span className="group">
              Clear completed
              <div className="absolute -left-12 -top-20 hidden w-[300px] bg-white p-4 shadow-md group-hover:block">
                This option is not supported by json-server.
                <br />
                So implemented by loop
              </div>
            </span>
          </div>
        </li>
      </ul>

      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center rounded-l-md bg-indigo-600 px-3">
          <HiOutlineSearch className="h-5 w-5 text-white" />
        </div>

        <input
          type="search"
          className="block w-full rounded-r-md border border-gray-300 bg-gray-100 p-2.5 pl-12 text-sm text-gray-900 outline-none focus:ring-violet-600"
          placeholder="Search your todo here"
          onChange={handleSearch}
        />
      </div>
    </div>
  );
}
