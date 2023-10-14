/* addTodo start */
export interface IAddTodoArgs {
  text: string;
  completed: boolean;
}

export interface IAddTodoRes {}
/* addTodo end */

/* ************************* */

/* getTodos start */
export interface IGetTodosData {
  text: string;
  completed: boolean;
  id: number;
  color?: string;
}

export interface IGetTodosArgs {
  _sort: "id";
  _order: "asc" | "desc";
  completed?: boolean | string;
  color?: string[];
  text_like?: string[];
}

export type IGetTodosRes = IGetTodosData[];
/* getTodos end */

/* ***************** */

/* editTodo start */
export interface IEditTodoArgs {
  id: number;
  data: { completed?: boolean; text?: string; color?: string };
}

export interface IEditTodoRes {}
/* editTodo end */

/* **************************** */

/* deleteTodo start */
export type TDeleteTodoArg = string | number;

export interface IDeleteTodoRes {}
/* deleteTodo end */
