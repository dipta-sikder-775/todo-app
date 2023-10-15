// import { useGetTodosQuery } from "../features/api/apiSlice";
// import { colorChanged, statusChanged } from "../features/filter/filterSlice";
import { useGetTodosQuery } from "@redux/features/todo/todoApi";
import {
  setColorFilterStatus,
  setTaskFilterStatus,
  selectFilterReducer,
  TTaskFilterType,
} from "@redux/features/filter/filterSlice";
import { useAppDispatch, useAppSelector } from "@redux/hooks";

const numberOfTodos = (no_of_todos: number) => {
  switch (no_of_todos) {
    case 0:
      return "No task";
    case 1:
      return "1 task";
    default:
      return `${no_of_todos} tasks`;
  }
};

export default function Footer() {
  const { completed, color, _order, _sort } =
    useAppSelector(selectFilterReducer);
  const { data: todos, isSuccess } = useGetTodosQuery({
    completed,
    _order,
    _sort,
  });
  const dispatch = useAppDispatch();

  const handleTaskFilterStatusChange = (status: TTaskFilterType) => {
    dispatch(setTaskFilterStatus(status));
  };

  const handleColorFilterStatusChange = (color: string) => {
    dispatch(setColorFilterStatus(color));
  };

  return (
    <div className="mt-4 flex flex-wrap justify-center gap-x-8 gap-y-2 text-xs text-gray-500 sm:flex-nowrap sm:justify-between">
      {isSuccess && (
        <>
          <p>
            {numberOfTodos(todos.filter((todo) => !todo.completed).length)} left
          </p>

          <ul className="flex items-center space-x-1 text-xs">
            <li
              className={`cursor-pointer ${
                (completed === null || completed === undefined) && "font-bold"
              }`}
              onClick={() => handleTaskFilterStatusChange("ALL")}
            >
              All
            </li>

            <li>|</li>

            <li
              className={`cursor-pointer ${completed === false && "font-bold"}`}
              onClick={() => handleTaskFilterStatusChange("INCOMPLETE")}
            >
              Incomplete
            </li>

            <li>|</li>

            <li
              className={`cursor-pointer ${completed === true && "font-bold"}`}
              onClick={() => handleTaskFilterStatusChange("COMPLETED")}
            >
              Complete
            </li>

            <li></li>
            <li></li>

            <li
              title="Filter by color group"
              className={`h-3 w-3 cursor-pointer rounded-full border-2 border-green-500 md:hover:bg-green-500 ${
                color?.includes("green") && "bg-green-500"
              }`}
              onClick={() => handleColorFilterStatusChange("green")}
            />

            <li
              title="Filter by color group"
              className={`h-3 w-3 cursor-pointer rounded-full border-2 border-red-500 md:hover:bg-red-500 ${
                color?.includes("red") && "bg-red-500"
              }`}
              onClick={() => handleColorFilterStatusChange("red")}
            />

            <li
              title="Filter by color group"
              className={`h-3 w-3 cursor-pointer rounded-full border-2 border-yellow-500 md:hover:bg-yellow-500 ${
                color?.includes("yellow") && "bg-yellow-500"
              }`}
              onClick={() => handleColorFilterStatusChange("yellow")}
            />
          </ul>
        </>
      )}
    </div>
  );
}
