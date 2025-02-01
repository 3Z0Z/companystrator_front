import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod";

import { getProductsCategories } from "../../services/ProductService";
import { CategoriesDTO, ProductDTO } from "../../types/product";
import { ProductSchema } from "../../schemas/product";
import { Link, useNavigate } from "react-router-dom";

type ProductFormProps = {
  product?: ProductDTO;
  error: string | undefined;
  onSubmit: SubmitHandler<ProductDTO>;
}

export default function ProductForm({ product, error, onSubmit } : Readonly<ProductFormProps>) {
  const navigate = useNavigate();
  const [categories, setCategories] = useState<CategoriesDTO[]>([]);

  const { register, handleSubmit, formState: { errors }, reset } = useForm<ProductDTO>({
    resolver: zodResolver(ProductSchema)
  });

  useEffect(() => {
    if (product) {
      reset({ ...product, code: String(product.code)});
    }
  }, [product, reset]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getProductsCategories();
        setCategories(data);
      } catch (err: any) {
        console.log(err.message);
      }
    };
    fetchCategories();
  }, []);

  return (
    <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)} autoComplete="off" noValidate>
      <button 
        onClick={(e) => {e.preventDefault(); navigate(-1);}} 
        className="w-fit text-gray-400 underline hover:text-gray-500 cursor-pointer"
      >
        Cancel
      </button>
      <h2 className="text-2xl font-bold text-center">
        {product ? 'Edit Product' : 'Create Product'}
      </h2>
      {error && (
        <p className="text-center font-black">{error}</p>
      )}
      <div className="grid grid-rows-3">
        <label htmlFor="code" className="font-medium text-lg">Code</label>
        <input 
          type="text"
          id="code"
          className="outline-none border py-1 px-2 disabled:bg-gray-300"
          placeholder="1234567890"
          disabled={!!product}
          {...register("code")}
        />
        {errors.code && (
          <p className="font-black">{errors.code.message}</p>
        )}
      </div>
      <div className="grid grid-rows-3">
        <label htmlFor="name" className="font-medium text-lg">Name</label>
        <input 
          type="text" 
          id="name" 
          className="outline-none border py-1 px-2"
          placeholder="Product name"
          {...register("name")}
        />
        {errors.name && (
          <p className="font-black">{errors.name.message}</p>
        )}
      </div>
      <div className="grid grid-rows-3">
        <label htmlFor="description" className="font-medium text-lg">Description</label>
        <input 
          type="text" 
          id="description" 
          className="outline-none border py-1 px-2"
          placeholder="Product name"
          {...register("description")}
        />
        {errors.description && (
          <p className="font-black">{errors.description.message}</p>
        )}
      </div>
      <div className="grid grid-rows-3">
        <label htmlFor="price_cop" className="font-medium text-lg">Price COP</label>
        <input 
          type="number"
          id="price_cop"
          className="outline-none border py-1 px-2"
          placeholder="$10000.00"
          {...register("price_cop", {
            setValueAs: (value) => Number(value)
          })}
        />
        {errors.price_cop && (
          <p className="font-black">{errors.price_cop.message}</p>
        )}
      </div>
      <div className="grid grid-rows-3">
        <label htmlFor="price_usd" className="font-medium text-lg">Price USD</label>
        <input 
          type="number"
          id="price_usd"
          className="outline-none border py-1 px-2"
          placeholder="$100.00"
          {...register("price_usd", {
            setValueAs: (value) => Number(value)
          })}
        />
        {errors.price_usd && (
          <p className="font-black">{errors.price_usd.message}</p>
        )}
      </div>
      <div className="grid grid-rows-3">
        <label htmlFor="price_mxn" className="font-medium text-lg">Price MXN</label>
        <input 
          type="number"
          id="price_mxn"
          className="outline-none border py-1 px-2"
          placeholder="$10000.00"
          {...register("price_mxn", {
            setValueAs: (value) => Number(value)
          })}
        />
        {errors.price_mxn && (
          <p className="font-black">{errors.price_mxn.message}</p>
        )}
      </div>
      <div className="grid grid-rows-3">
        <label htmlFor="primary_category" className="font-medium text-lg">Category</label>
        <select 
          id="primary_category"
          className="outline-none border py-1 px-2"
          {...register("primary_category", {
            setValueAs: (value) => value === "" ? null : Number(value)
          })}
        >
          <option value="">-- SELECT --</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.category}
            </option>
          ))}
        </select>
        {errors.primary_category && (
          <p className="font-black">{errors.primary_category.message}</p>
        )}
      </div>
      <Link to={'/create-product-category'} className="w-fit border py-1 px-2 ml-auto hover:bg-gray-400 cursor-pointer">
        Can't find right category? Create a new one
      </Link>
      <div className="grid grid-rows-3">
        <label htmlFor="secondary_category" className="font-medium text-lg">Subcategory</label>
        <select 
          id="secondary_category"
          className="outline-none border py-1 px-2"
          {...register("secondary_category", {
            setValueAs: (value) => value === "" ? null : Number(value)
          })}
        >
          <option value="">-- SELECT --</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.category}
            </option>
          ))}
        </select>
        {errors.secondary_category && (
          <p className="font-black">{errors.secondary_category.message}</p>
        )}
      </div>
      <button type="submit" className="border py-2 hover:bg-gray-400 transition-colors cursor-pointer w-4/5 mx-auto">
        Save Product
      </button>
    </form>
  )
}
