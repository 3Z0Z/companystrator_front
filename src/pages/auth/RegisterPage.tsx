import { useState } from "react";
import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom";
import { RegisterForm } from "../../types/auth";
import { registerService } from "../../services/AuthService";

export default function RegisterPage() {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const { register, handleSubmit, formState: { errors } } = useForm<RegisterForm>();

  const onSubmit = async (data: RegisterForm) => {
    try {
      await registerService(data);
      navigate("/auth/login");
    } catch (error: any) {
      setError(error.message || "Register failed");
    }
  }

  return (
    <>
      <h1 className="text-3xl font-bold">Register</h1>
      {error != null && (<p className="font-black">{error}</p>)}
      <form className="flex flex-col gap-2 w-1/2 m-auto" onSubmit={handleSubmit(onSubmit)} autoComplete="off">
        <div className="grid grid-rows-3">
          <label htmlFor="email" className="font-medium text-lg">
            email
          </label>
          <input 
            type="email" 
            id="email" 
            className="outline-none border py-1 px-2" 
            {...register("email", { required: "Email is required" })}
          />
          {errors.email && (
            <p>{errors.email.message}</p>
          )}
        </div>
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
          Register
        </button>
      </form>
      <Link to={'/auth/login'} className="text-center text-gray-500 underline hover:text-gray-700">
        Sing in
      </Link>
    </>
  )
}
