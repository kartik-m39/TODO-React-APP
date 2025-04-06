import React, { useEffect } from "react";
import { useRecoilState, useRecoilValue, useRecoilValueLoadable } from "recoil";
import { completedTodos, fetchTodos, todoState } from "./Recoil_state";

function Completed() {
  const [todo, setTodo] = useRecoilState(todoState);
  const completedTodo = useRecoilValue(completedTodos);
  const todosLoadable = useRecoilValueLoadable(fetchTodos);

  // Sync the todos when this component mounts or when data is loaded
  useEffect(() => {
    if (todosLoadable.state === "hasValue") {
      setTodo(todosLoadable.contents);
    }
  }, [todosLoadable.state, setTodo, todosLoadable.contents]);
  
//   console.log(todo);
//   const completedTodo = todo.filter(item => item.completed === true);
//   console.log(completedTodo);

  if (todosLoadable.state === "loading") {
    return <h2>Loading completed tasks...</h2>;
  }

  return (
    <>
      <h2>Completed Tasks</h2>
      <div>
        {completedTodo.length === 0 ? (
          <p>No Completed tasks</p>
        ) : (
            completedTodo.map((item) => (
            <div key={item._id}>
              <li>{item.description}</li>
            </div>
            ))
        )}
      </div>
    </>
  );
}

export default Completed;
