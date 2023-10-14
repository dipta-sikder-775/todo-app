import ListContainer from "./ListContainer";
import Todo from "./Todo";

export default function TodoList() {
  return (
    <ListContainer>
      {[]?.map((todo) => <Todo todo={todo} key={todo.id} />)}
    </ListContainer>
  );
}
