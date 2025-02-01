import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form"

import { CreateCategoryDTO } from "../../types/product";
import { createProductCategory } from "../../services/ProductService";
import { useNavigate } from "react-router-dom";

export default function CreateProductCategory() {
  const navigate = useNavigate();
  const [error, setError] = useState();
  const { register, handleSubmit, formState: { errors } } = useForm<CreateCategoryDTO>();

  const onSubmit: SubmitHandler<CreateCategoryDTO> = async (request) => {
    try {
      await createProductCategory(request);
      navigate(-1);
    } catch(error: any) {
      setError(error.message);
    }
  }

  return (
    <div className="max-w-150 border p-5 mx-auto">
      <form onSubmit={handleSubmit(onSubmit)} autoComplete="off" noValidate>
        <h2 className="text-2xl font-bold text-center">Create new product category</h2>
        {error && (
          <p className="text-center font-black">{error}</p>
        )}
        <div className="grid grid-rows-3">
          <label htmlFor="category" className="font-medium text-lg">New category</label>
          <input 
            type="text"
            id="category"
            className="outline-none border py-1 px-2 disabled:bg-gray-300"
            placeholder="CLEANING"
            {...register("category", {
              required: "Is required",
              pattern: {
                value: /^[a-zA-Z0-9_]{5,20}$/,
                message: "Must be 5 to 20 characters, letters, numbes and special characters(_)"
              }
            })}
          />
          {errors.category && (
            <p className="font-black">{errors.category.message}</p>
          )}
        </div>
        <button
          type="submit"
          className="block border py-1 w-4/5 mx-auto hover:bg-gray-400 cursor-pointer"
        >
          Create category
        </button>
      </form>
    </div>
  )
}
