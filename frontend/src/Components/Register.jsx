import React, { useState } from "react";
import { useForm } from "react-hook-form";
import instance from "../utilities/Axios";
import { useRecoilState } from "recoil";
import { authtoken } from "./Recoil_state";

function Register() {
  const [login, setlogin] = useState(true);
  const [token, setToken] = useRecoilState(authtoken);

  const { register, handleSubmit, reset } = useForm();

  const formSubmit = async (data) => {
    if (login) {
      // registering a new user

      try {
        const response = await instance.post(
          "/api/user/signup",
          {
            username: data.username,
            password: data.password,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        console.log(response.data);
      } catch (err) {
        console.log(err);
      }
    } else {
      //signup an existing user

      try {
        const response = await instance.post(
          "/api/user/login",
          {
            username: data.username,
            password: data.password,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log(response.data);

        const token = response.data.token;

        // can store JWT in the recoil state
        localStorage.setItem("token", token);
        setToken(token);

        // render the next dashboard page

        // navigate("/home");
      } catch (err) {
        console.log(err);
      }
    }
    reset();
  };

  return (
    <>
      <div className="bg-gray-950 text-white h-screen w-full font-[Poppins] flex flex-col justify-center items-center ">
        {login ? (
          <>
            <h1 className="text-3xl mb-4 underline">Register with Us!</h1>
            <form onSubmit={handleSubmit(formSubmit)} className="flex flex-col rounded-md mb-4 p-6 bg-gray-800">
              <label className="text-base mb-1">Username</label>
              <input {...register("username")} type="text" className="border rounded-md px-3 py-2 mb-4 bg-white text-black" required></input>
              <label className="text-base mb-1">Password</label>
              <input {...register("password")} type="password" className="border rounded-md px-3 py-2 mb-4 bg-white text-black" required></input>
              <input type="submit" value="Register" className="bg-yellow-400 rounded-md px-4 py-2 hover:bg-yellow-500 ease-in-out " />
            </form>
            <div className="flex flex-col mt-2">
              <p className="text-base">Already have an account?</p>
              <button onClick={() => setlogin(false)} className="text-gray-400 hover:underline ease-in-out">SignIn</button>
            </div>
          </>
        ) : (
          <>
            <h1 className="text-3xl mb-4 underline">SignIn</h1>
            <form onSubmit={handleSubmit(formSubmit)} className="flex flex-col rounded-md mb-4 p-6 bg-gray-800">
              <label className="text-base mb-1">Username</label>
              <input {...register("username")} type="text" className="border rounded-md px-3 py-2 mb-4 bg-white text-black" required></input>
              <label className="text-base mb-1">Password</label>
              <input {...register("password")} type="password" className="border rounded-md px-3 py-2 mb-4 bg-white text-black" required></input>
              <input type="submit" value="SignIn" className="bg-yellow-400 rounded-md px-4 py-2 hover:bg-yellow-500 ease-in-out " />
            </form>
            <div className="flex flex-col mt-2">
              <p className="text-base">Don't have an account?</p>
              <button onClick={() => setlogin(true)} className="text-gray-400 hover:underline ease-in-out">Register</button>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default Register;
