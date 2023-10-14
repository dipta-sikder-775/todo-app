import Todo from "./Todo";
import ListContainer from "./ListContainer";
import { useGetTodosQuery } from "@redux/features/todo/todoApi";
import { selectFilterReducer } from "@redux/features/filter/filterSlice";
import { useAppSelector } from "@redux/hooks";

export default function TodoList() {
  const { _order, _sort, color, text_like, completed } =
    useAppSelector(selectFilterReducer);

  const {
    data: todos,
    isLoading,
    isFetching,
    isError,
  } = useGetTodosQuery({ _order, _sort, color, completed, text_like });

  if (isLoading && !isError) {
    return <p className="text-center">Loading...</p>;
  }

  if (!isLoading && isError) {
    return <p>Something went wrong</p>;
  }

  if (!isLoading && !isFetching && !isError && !todos?.length) {
    return <p className="text-center">No todo found</p>;
  }

  return (
    <ListContainer>
      {todos?.map((todo) => <Todo todo={todo} key={todo.id} />)}
    </ListContainer>
  );
}
