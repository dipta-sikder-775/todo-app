// import cancelImage from "../assets/images/cancel.png";
// import editIcon from "../assets/icons/edit.svg";
import { TiPencil, TiDeleteOutline } from "react-icons/ti";

type THandleSubmit = (
  e: React.FormEvent<HTMLFormElement>,
  text: string,
) => void;

interface ITodoProps {
  todo: IGetTodosData;
}

export default function Todo({ todo }: ITodoProps) {

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
{text}
      </div>

      <div
        className={`ml-auto h-4 w-4 flex-shrink-0 cursor-pointer rounded-full border-2 border-green-500 hover:bg-green-500 ${
          color === "green" && "bg-green-500"
        }`}
        title="Group category"
        onClick={() => {}}
      />

      <div
        className={`ml-auto h-4 w-4 flex-shrink-0 cursor-pointer rounded-full border-2 border-yellow-500 hover:bg-yellow-500 ${
          color === "yellow" && "bg-yellow-500"
        }`}
        title="Group category"
        onClick={() => {}}
      />

      <div
        className={`ml-auto h-4 w-4 flex-shrink-0 cursor-pointer rounded-full border-2 border-red-500 hover:bg-red-500 ${
          color === "red" && "bg-red-500"
        }`}
        title="Group category"
        onClick={() => {}}
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
