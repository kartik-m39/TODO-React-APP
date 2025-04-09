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
    <div className="bg-gray-950 text-white h-screen w-full font-[Poppins] flex flex-col items-center ">
      <h2 className="text-xl text-white mb-4 mt-10">Completed Tasks</h2>
      <div className="space-y-2">
        {completedTodo.length === 0 ? (
          <p className="text-white">No Completed tasks</p>
        ) : (
          completedTodo.map((item) => (
            <div key={item._id} className="bg-gray-200 p-4 rounded-lg">
              <p className="text-gray-900">{item.description}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Completed;
