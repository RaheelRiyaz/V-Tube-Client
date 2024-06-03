import { useForm } from "react-hook-form";
import Input from "../../shared/components/Input";
import ErrorMessage from "../../shared/components/ErrorMessage";
import { BASE_SERVICE } from "../../services/BaseService";
import { savetokens } from "../../services/TokenService";
import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Toaster } from "../../services/Toast";
import { IForm, ISignup, LoginResponse } from "../../models/User";

function Login({ isSignup = false }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ISignup>();
  const navigateTo = useNavigate();

  const [loading, setLoading] = useState(false);

  function handleForm(data: ISignup) {
    setLoading(true);
    !isSignup ? handleLogin(data) : handleSignup(data);
  }

  function handleLogin(data:IForm) {
    BASE_SERVICE.Post<IForm, LoginResponse>("users/login", data, false)
      .then((res) => {
        if (res.isSuccess) {
          savetokens({
            accessToken: res?.result?.accessToken,
            refreshToken: res?.result?.refreshToken,
          });
          Toaster.Success(res.message);
          navigateTo("/");
        } else {
          Toaster.Error(res.message);
        }
      })
      .catch((err) => {
        Toaster.Error(err.message);
      })
      .finally(() => setLoading(false));
  }

  function handleSignup(data: ISignup) {
    BASE_SERVICE.Post<ISignup, LoginResponse>("users/register", data, false)
      .then((res) => {
        if (res.isSuccess) {
          Toaster.Success(res.message);
          navigateTo("/login");
        } else {
          Toaster.Error(res.message);
        }
      })
      .catch((err) => {
        Toaster.Error(err.message);
      })
      .finally(() => setLoading(false));
  }

  return (
    <form
      onSubmit={handleSubmit(handleForm)}
      className="p-5 lg:w-1/3 md:w-1/2 w-[70%] mx-auto shadow-lg border border-t-1  mt-24 rounded-lg"
    >
      <h1 className="text-3xl mb-5 text-blue-500">
        {!isSignup ? "Welcome Back!" : "Register Form!"}
      </h1>
      <Input
        htmlFor="userName"
        label="Username"
        type="text"
        placeholder="Username"
        classes={errors.userName ? "border border-red-500 outline-red-500" : ""}
        {...register("userName", {
          required: {
            value: true,
            message: "Username field is required",
          },
        })}
      />
      {errors.userName && <ErrorMessage message={errors.userName.message} />}

      {isSignup && (
        <Input
          htmlFor="email"
          label="Email Address"
          type="email"
          placeholder="Email address"
          classes={
            errors.userName ? "border border-red-500 outline-red-500" : ""
          }
          {...register("email", {
            required: {
              value: true,
              message: "Email field is required",
            },
          })}
        />
      )}
      {errors.email && <ErrorMessage message={errors.email.message} />}
      <Input
        htmlFor="password"
        label="Password"
        placeholder="Password"
        type="password"
        classes={errors.password ? "outline-red-500 border border-red-500" : ""}
        {...register("password", {
          required: {
            value: true,
            message: "Password field is required",
          },
        })}
      />
      {errors.password && <ErrorMessage message={errors.password.message} />}
      {!isSignup ? (
        <p>
          Don't have an account ?
          <NavLink
            to={"/signup"}
            className="text-blue-400 text-sm cursor-pointer"
          >
            <strong>Signup</strong>
          </NavLink>
        </p>
      ) : (
        <p>
          Already have an account ?
          <NavLink
            to={"/login"}
            className="text-blue-400 text-sm cursor-pointer"
          >
            <strong>Login</strong>
          </NavLink>
        </p>
      )}

      {!loading ? (
        <button
          type="submit"
          className="text-white bg-blue-700 w-full mt-5 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          {!isSignup ? "Login" : "Register"}
        </button>
      ) : (
        <button
          disabled
          className="text-white bg-blue-400 w-full mt-5 hover:bg-blue-500 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          {!isSignup ? "Logging in..." : "Registering..."}
        </button>
      )}
    </form>
  );
}

export default Login;
