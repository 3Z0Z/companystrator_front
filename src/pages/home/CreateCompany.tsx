import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { CompanySchema } from "../../schemas/company";
import { CompanyDTO } from "../../types/company";
import { createCompany } from "../../services/CompanyService";
import { useNavigate } from "react-router-dom";

export default function CreateCompany() {
  const navigate = useNavigate()
  const { register, handleSubmit, formState: { errors } } = useForm<CompanyDTO>({
    resolver: zodResolver(CompanySchema)
  });

  const submitChanges = async (request: CompanyDTO) => {
    await createCompany(request);
    navigate('/');
  }

  return (
    <div className="max-w-150 border p-5 mx-auto">
      <form className="flex flex-col gap-2 w-full px-2" autoComplete="off" onSubmit={handleSubmit(submitChanges)}>
        <h2 className="text-2xl font-bold text-center">Create Company</h2>
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className="font-bold">
            Company name:
          </label>
          <input
            type="text"
            id="name"
            className="py-1 px-3 outline-none border"
            placeholder="Company name"
            {...register("name")}
          />
          {errors.name && (
            <p className="font-black">{errors.name.message}</p>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="nit" className="font-bold">
            NIT:
          </label>
          <input
            type="text"
            id="nit"
            className="py-1 px-3 outline-none border"
            placeholder="1234567890"
            {...register("NIT")}
          />
          {errors.NIT && (
            <p className="font-black">{errors.NIT.message}</p>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="address" className="font-bold">
            Address:
          </label>
          <input
            type="text"
            id="address"
            className="py-1 px-3 outline-none border"
            placeholder="Address description 123 - 123 # 11"
            {...register("address")}
          />
          {errors.address && (
            <p className="font-black">{errors.address.message}</p>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="phone" className="font-bold">
            Phone:
          </label>
          <div className="grid grid-cols-4 gap-2 w-full">
            <input
              type="text"
              id="phone_indicator"
              className="py-1 px-3 outline-none border"
              placeholder="+123"
              {...register("phone_indicator")}
            />
            <input
              type="text"
              id="phone"
              className="col-span-3 py-1 px-3 outline-none border"
              placeholder="1234567890"
              {...register("phone")}
            />
          </div>
        </div>
        {errors.phone_indicator && (
          <p className="font-black">{errors.phone_indicator.message}</p>
        )}
        {errors.phone && (
          <p className="font-black">{errors.phone.message}</p>
        )}
        <button
          type="submit"
          className="py-1 px-4 border hover:bg-gray-400 cursor-pointer transition-colors mt-3"
        >
          Save
        </button>
      </form>
    </div>
  )
}
