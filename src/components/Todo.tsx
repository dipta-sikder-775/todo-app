// import cancelImage from "../assets/images/cancel.png";
// import editIcon from "../assets/icons/edit.svg";

import { useState } from "react";
import { toast } from "react-hot-toast";
import {
  useDeleteTodoMutation,
  useEditTodoMutation,
} from "@redux/features/todo/todoApi";
import { IGetTodosData } from "@ts/todo";
import EditForm from "./EditForm";
import CopyToClipBoard from "./CopyToClipBoard";
import { TiPencil, TiDeleteOutline } from "react-icons/ti";

type THandleSubmit = (
  e: React.FormEvent<HTMLFormElement>,
  text: string,
) => void;

interface ITodoProps {
  todo: IGetTodosData;
}

export default function Todo({ todo }: ITodoProps) {
  const { text, id, completed = false, color } = todo || {};
  const [isEditing, setIsEditing] = useState(false);
  const [deleteTodo] = useDeleteTodoMutation();
  const [editTodo] = useEditTodoMutation();

  const handleStatusChange = async () => {
    if (!completed) {
      try {
        toast.loading("Executing todo complete action", { id: "editTodo" });
        await editTodo({ id, data: { completed: true } }).unwrap();
        toast.success("Todo completed", { id: "editTodo" });
      } catch (error) {
        toast.error("Failed to execute todo complete action", {
          id: "editTodo",
        });
      }
    } else {
      try {
        toast.loading("Executing todo incomplete action", { id: "editTodo" });
        await editTodo({ id, data: { completed: false } }).unwrap();
        toast.success("Todo incomplete", { id: "editTodo" });
      } catch (error) {
        toast.error("Failed to execute todo incomplete action", {
          id: "editTodo",
        });
      }
    }
  };

  const handleColorChange = async (color: string) => {
    try {
      toast.loading("Executing category edit", { id: "editTodo" });
      await editTodo({ id, data: { color } }).unwrap();
      toast.success("Category edit executed successfully", { id: "editTodo" });
    } catch (error) {
      toast.error("Failed to execute edit category", { id: "editTodo" });
    }
  };

  const handleDelete = async () => {
    try {
      toast.loading("Executing delete a todo", { id: "deleteTodo" });
      await deleteTodo(id).unwrap();
      toast.success("Todo deleted successfully", { id: "deleteTodo" });
    } catch (error) {
      toast.error("Failed to execute delete a todo", { id: "deleteTodo" });
    }
  };

  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleSubmit: THandleSubmit = async (e, newText) => {
    e.preventDefault();

    try {
      toast.loading("Executing edit a todo", { id: "editTodo" });
      await editTodo({ id, data: { text: newText } }).unwrap();
      toast.success("Edit a todo executed successfully", { id: "editTodo" });
      setIsEditing(false);
    } catch (error) {
      toast.error("Failed to execute edit a todo", { id: "editTodo" });
    }
  };

  const labelId = crypto?.randomUUID();

  return (
    <div className="flex items-center justify-start gap-x-4 border-b border-gray-400/20 p-2 last:border-0 hover:bg-gray-100 hover:transition-all">
      <div
        className={`relative mr-2 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full border-2 border-gray-400 bg-white ${
          completed && "border-green-500 focus-within:border-green-500"
        }`}
        title={completed ? "Incomplete task" : "Complete task"}
      >
        <label htmlFor={labelId} className="sr-only">
          checkbox
        </label>

        <input
          id={labelId}
          type="checkbox"
          checked={completed}
          onChange={handleStatusChange}
          className="absolute cursor-pointer rounded-full opacity-0"
        />

        {completed && (
          <svg
            className="pointer-events-none h-3 w-3 fill-current text-green-500"
            viewBox="0 0 20 20"
          >
            <path d="M0 11l2-2 5 5L18 3l2 2L7 18z" />
          </svg>
        )}
      </div>

      <div
        className={`w-[320px] min-w-[300px] flex-1 select-none ${
          completed && "line-through"
        }`}
      >
        {isEditing ? (
          <EditForm todoText={text} handleSubmit={handleSubmit} />
        ) : (
          text
        )}
      </div>

      <div
        className={`ml-auto h-4 w-4 flex-shrink-0 cursor-pointer rounded-full border-2 border-green-500 hover:bg-green-500 ${
          color === "green" && "bg-green-500"
        }`}
        title="Group category"
        onClick={() => handleColorChange("green")}
      />

      <div
        className={`ml-auto h-4 w-4 flex-shrink-0 cursor-pointer rounded-full border-2 border-yellow-500 hover:bg-yellow-500 ${
          color === "yellow" && "bg-yellow-500"
        }`}
        title="Group category"
        onClick={() => handleColorChange("yellow")}
      />

      <div
        className={`ml-auto h-4 w-4 flex-shrink-0 cursor-pointer rounded-full border-2 border-red-500 hover:bg-red-500 ${
          color === "red" && "bg-red-500"
        }`}
        title="Group category"
        onClick={() => handleColorChange("red")}
      />

      <CopyToClipBoard copyText={text} />

      <TiPencil
        title="Edit todo"
        onClick={handleEdit}
        className="ml-2 h-5 w-5 flex-shrink-0 cursor-pointer"
      />

      <TiDeleteOutline
        title="Delete todo"
        onClick={handleDelete}
        className="ml-2 h-5 w-5 flex-shrink-0 cursor-pointer"
      />
    </div>
  );
}
