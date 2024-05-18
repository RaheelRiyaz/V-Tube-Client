import { useForm } from "react-hook-form";
import Input from "../../shared/components/Input";
import ErrorMessage from "../../shared/components/ErrorMessage";
import { BASE_SERVICE } from "../../services/BaseService";

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
 
  function handleForm(data: IForm) {
    console.log(data);
    BASE_SERVICE.Post<IForm, LoginResponse>("users/login", data, false)
      .then((res) => {
        if (res.isSuccess) {
          console.log(res);
        } else {
          console.log(res);
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {});
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
      <button
        type="submit"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
      >
        Login
      </button>
    </form>
  );
}

export default Login;
