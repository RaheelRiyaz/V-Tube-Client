import { useForm } from "react-hook-form";
import Input from "../../shared/components/Input";
import ErrorMessage from "../../shared/components/ErrorMessage";
import { BASE_SERVICE } from "../../services/BaseService";
import { savetokens } from "../../services/TokenService";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

//#region Models

interface IForm {
  userName: string;
  password: string;
}
interface LoginResponse {
  id: string;
  accessToken: string;
  refreshToken: string;
}
//#endregion Models

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IForm>();
  const navigateTo = useNavigate();

  const [loading, setLoading] = useState(false);

  function handleForm(data: IForm) {
    setLoading(true);
    BASE_SERVICE.Post<IForm, LoginResponse>("users/login", data, false)
      .then((res) => {
        if (res.isSuccess) {
          console.log(res);
          savetokens({
            accessToken: res?.result?.accessToken,
            refreshToken: res?.result?.refreshToken,
          });
          navigateTo("/");
        } else {
          console.log(res);
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setLoading(false));
  }
  return (
    <form
      onSubmit={handleSubmit(handleForm)}
      className="p-5 w-1/3 mx-auto border border-gray mt-14 rounded-lg"
    >
      <Input
        htmlFor="userName"
        label="Username"
        placeholder="Username"
        {...register("userName", {
          required: {
            value: true,
            message: "Username field is required",
          },
        })}
      />
      {errors.userName && <ErrorMessage message={errors.userName.message} />}

      <Input
        htmlFor="password"
        label="Password"
        placeholder="Password"
        type="password"
        {...register("password", {
          required: {
            value: true,
            message: "Password field is required",
          },
        })}
      />
      {errors.password && <ErrorMessage message={errors.password.message} />}
      {!loading ? (
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          Login
        </button>
      ) : (
        <button
          disabled
          className="text-white bg-blue-400 hover:bg-blue-500 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          Logging in...
        </button>
      )}
    </form>
  );
}

export default Login;
