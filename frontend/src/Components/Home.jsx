import React, { useEffect, useRef } from "react";
import { useRecoilState, useRecoilValue, useRecoilValueLoadable } from "recoil";
import { authtoken, fetchTodos, todoState, message } from "./Recoil_state";
import instance from "../utilities/Axios";

function Home() {
  const input = useRef();
  const [todos, setTodos] = useRecoilState(todoState);
  const [msg, setMsg] = useRecoilState(message);
  const token = useRecoilValue(authtoken);
  const getTodos = useRecoilValueLoadable(fetchTodos);
  // console.log(todos);

  const handleAddTodo = async () => {
    // console.log(input.current.value);
    const description = input.current.value;

    try {
      const response = await instance.post(
        "/api/todos/add",
        {
          description,
          completed: false,
        },
        {
          headers: {
            "Content-Type": "application/json",
            authorization: `${token}`,
          },
        }
      );

      //   console.log(response.data);
      //   console.log(response.data.todo);
      //   console.log(response);

      // after addition in backend then add to frontend
      setTodos([...todos, response.data.todo]);
      setMsg(response.data.message);
    } catch (err) {
      console.log(err);
    }
    // To reset the input box afterwards
    input.current.value = "";
  };

  const handleDeleteTodo = async (id) => {
    try {
      const response = await instance.delete(`/api/todos/delete/${id}`, {
        headers: {
          authorization: `${token}`,
        },
      });
      console.log(response.data);

      // After successfull deletion also change the state
      setTodos((prev) =>
        prev.filter((todo) => {
          const todoID = todo._id || todo.userId;
          return todoID != id;
        })
      );
      setMsg(response.data.message);
    } catch (err) {
      console.log(err);
    }
  };

  const handleCompleteTodo = async (id) => {
    try {
      const response = await instance.patch(
        `/api/todos/toggle/${id}`,
        {},
        {
          headers: {
            authorization: `${token}`,
          },
        }
      );

      // To toggle the completed state of the todo after toggling in backend

      // setTodos((prev) => {
      //   // console.log(prev);
      //   return prev.map((todo) => {
      //     if (todo._id === id) {
      //       console.log(todo)
      //       return { ...todo, completed: !todo.completed };
      //     }
      //     else{
      //       return todo;
      //     }
      //   });
      // });

      const refreshedData = await instance.get("/api/todos/fetch", {
        headers: {
          authorization: `${token}`,
        },
      });

      // setCompleted(refreshedData)

      if (Array.isArray(refreshedData)) {
        setTodos(refreshedData.data);
      }
      setMsg(response.data.message);
    } catch (err) {
      console.log(err);
    }
  };

  // only run once when the loading is complete, using this to avoid infinte re-renders
  useEffect(() => {
    if (getTodos.state === "hasValue") {
      setTodos(getTodos.contents);
    }
  }, [getTodos.state]);

  if (getTodos.state === "loading") {
    return <h2>Loading...</h2>;
  }

  return (
    <>
      <div className="bg-gray-950 text-white h-screen w-full font-[Poppins] flex flex-col items-center ">
        <h1 className="text-xl mt-10">Add a Todo </h1>
        <h2 className="text-red-500 text-base m-2">{msg}</h2>
        <div>
          <input type="text" name="input" ref={input} className="border rounded-md px-3 py-2 mb-4 w-full bg-white text-black"></input>
          <button onClick={handleAddTodo} className="text-lg bg-yellow-400 rounded-md px-4 py-2 m-2 hover:bg-yellow-500 ease-in-out ">Add</button>
        </div>
        <div className="py-6 px-4 w-full">
          {todos?.map((item) => {
            return (
              <div key={item._id} className="bg-gray-200 m-2 p-4 rounded-lg flex justify-between items-center text-gray-900">
                <p>{item.description}</p>
                <div>
                  <button onClick={() => handleCompleteTodo(item._id)} className="bg-red-500 text-white px-3 py-1 rounded-md mr-2">
                    Completed
                  </button>
                  <button onClick={() => handleDeleteTodo(item._id)} className="bg-red-500 text-white px-3 py-1 rounded-md">
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default Home;
