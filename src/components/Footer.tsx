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

  return (
    <div className="mt-4 flex flex-wrap justify-center gap-x-8 gap-y-2 text-xs text-gray-500 sm:flex-nowrap sm:justify-between">
      {isSuccess && (
        <>
          <p>
            {numberOfTodos(1)} left
          </p>

          <ul className="flex items-center space-x-1 text-xs">
            <li
              className={`cursor-pointer ${
                (completed === null || completed === undefined) && "font-bold"
              }`}
              onClick={() => {}}
            >
              All
            </li>

            <li>|</li>

            <li
              className={`cursor-pointer ${completed === false && "font-bold"}`}
              onClick={() => {}}
            >
              Incomplete
            </li>

            <li>|</li>

            <li
              className={`cursor-pointer ${completed === true && "font-bold"}`}
              onClick={() => {}}
            >
              Complete
            </li>

            <li></li>
            <li></li>

            <li
              className={`h-3 w-3 cursor-pointer rounded-full border-2 border-green-500 md:hover:bg-green-500 ${
                color?.includes("green") && "bg-green-500"
              }`}
              onClick={() => handleColorFilterStatusChange("green")}
            />

            <li
              className={`h-3 w-3 cursor-pointer rounded-full border-2 border-red-500 md:hover:bg-red-500 ${
                color?.includes("red") && "bg-red-500"
              }`}
              onClick={() => handleColorFilterStatusChange("red")}
            />

            <li
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
