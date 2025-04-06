import { atom, selector } from "recoil";
import instance from "../utilities/Axios";

const token = localStorage.getItem("token");

const todoState = atom({
  key: "todoState",
  default: [],
});

const authtoken = atom({
  key: "authtoken",
  default: token ? token : "",
});

const fetchTodos = selector({
  key: "fetchTodos",
  get: async () => {
    const response = await instance.get("/api/todos/fetch", {
      headers:{
          'authorization': `${token}`,
      }
  });
    return response.data;
  },
});

const completedTodos = selector({
  key: "completedTodos",
  get: ({get}) => {
    const todos = get(todoState);
    return todos.filter(todo => todo.completed === true);
  }
})

const message = atom({
  key: "message",
  default: ""
})

export { todoState, fetchTodos, authtoken, message, completedTodos };
