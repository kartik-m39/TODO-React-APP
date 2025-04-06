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

      if(Array.isArray(refreshedData)){
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
      <h1>Hi kartik!</h1>
      <h2>{msg}</h2>
      <div>
        <input type="text" name="input" ref={input}></input>
        <button onClick={handleAddTodo}>Submit</button>
      </div>
      <div>
        {todos?.map((item) => {
          return (
            <div key={item._id}>
              <li>{item.description}</li>
              <button onClick={() => handleCompleteTodo(item._id)}>
                Completed
              </button>
              <button onClick={() => handleDeleteTodo(item._id)}>Delete</button>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default Home;
