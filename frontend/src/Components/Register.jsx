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
      <div>
        {login ? (
          <>
            <h1>Register with Us!</h1>
            <form onSubmit={handleSubmit(formSubmit)}>
              <label>Username</label>
              <input {...register("username")} type="text" required></input>

              <label>Password</label>
              <input {...register("password")} type="text" required></input>

              <input type="submit" value="Register" />
            </form>
            <div>
              <p>Already have an account?</p>
              <button onClick={() => setlogin(false)}>SignIn</button>
            </div>
          </>
        ) : (
          <>
            <h1>SignIn</h1>
            <form onSubmit={handleSubmit(formSubmit)}>
              <label>Username</label>
              <input {...register("username")} type="text" required></input>

              <label>Password</label>
              <input {...register("password")} type="text" required></input>

              <input type="submit" value="SignIn" />
            </form>
            <div>
              <p>Don't have an account?</p>
              <button onClick={() => setlogin(true)}>Register</button>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default Register;
