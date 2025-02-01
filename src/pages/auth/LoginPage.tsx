import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../services/AuthService";
import { useState } from "react";
import { useAuthStorage } from "../../store";
import { LoginForm } from "../../types/auth";

export default function LoginPage() {
  const navigate = useNavigate();
  const { setToken } = useAuthStorage();
  const [error, setError] = useState<string | null>(null);
  const { register, handleSubmit, formState: { errors } } = useForm<LoginForm>();
  
  const onSubmit : SubmitHandler<LoginForm> = async (data) => {
    try {
      const token = await login(data);
      setToken(token.access_token);
      navigate("/");
    } catch (error: any) {
      setError(error.message || "Login failed");
    }
  }

  return (
    <>
      <h1 className="text-3xl font-bold">Sing in</h1>
      {error != null && (<p className="font-black">{error}</p>)}
      <form className="flex flex-col gap-2 w-1/2 m-auto" onSubmit={handleSubmit(onSubmit)} autoComplete="off">
        <div className="grid grid-rows-3">
          <label htmlFor="username" className="font-medium text-lg">
            Username
          </label>
          <input 
            type="text" 
            id="username" 
            className="outline-none border py-1 px-2" 
            {...register("username", { required: "Username is required" })}
          />
          {errors.username && (
            <p>{errors.username.message}</p>
          )}
        </div>
        <div className="grid grid-rows-3">
          <label htmlFor="password" className="font-medium text-lg">
            Password
          </label>
          <input 
            type="password" 
            id="password" 
            className="outline-none border py-1 px-2" 
            {...register("password", { required: "Password is required" })}
          />
          {errors.password && (
            <p>{errors.password.message}</p>
          )}
        </div>
        <button type="submit" className="border py-2 hover:bg-gray-400 transition-colors cursor-pointer w-4/5 mx-auto">
          Sing in
        </button>
      </form>
      <Link to={'/auth/register'} className="text-center text-gray-500 underline hover:text-gray-700">
        Create an account
      </Link>
    </>
  )
}
