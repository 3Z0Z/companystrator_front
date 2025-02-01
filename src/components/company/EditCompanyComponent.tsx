import { Dispatch, SetStateAction, useState } from "react";
import { useForm } from "react-hook-form";

import { CompanyDTO } from "../../types/company";
import { updateCompany } from "../../services/CompanyService";
import { zodResolver } from "@hookform/resolvers/zod";
import { CompanySchema } from "../../schemas/company";

type EditCompanyComponentProps = {
  company: CompanyDTO;
  setEdit: Dispatch<SetStateAction<boolean>>;
  setCompany: Dispatch<SetStateAction<CompanyDTO | null>>;
}

export default function EditCompanyComponent({ company, setEdit, setCompany } : Readonly<EditCompanyComponentProps>) {
  const [error, setError] = useState<string | null>(null);
  const { register, handleSubmit, formState: { errors } } = useForm<CompanyDTO>({
    defaultValues: company,
    resolver: zodResolver(CompanySchema)
  });

  const submitChanges = async (request: CompanyDTO) => {
    if (
      company.NIT === request.NIT &&
      company.name === request.name &&
      company.address === request.address &&
      company.phone_indicator === request.phone_indicator &&
      company.phone === request.phone
    ) {
      setEdit(false);
      return;
    }
    try {
      await updateCompany(request);
      setEdit(false);
      setCompany(request);
    } catch (error: any) {
      setError(error.message);
    }
  }

  return (
    <form className="flex flex-col gap-2 w-full px-2" autoComplete="off" onSubmit={handleSubmit(submitChanges)}>
      <h3 className="text-xl font-bold text-center">Edit Company</h3>
      {error && (
        <p className="font-bold text-center underline">{error}</p>
      )}
      <div className="flex flex-col gap-2">
        <label htmlFor="name" className="font-bold">
          Company name:
        </label>
        <input
          type="text"
          id="name"
          className="py-1 px-3 outline-none border"
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
          className="py-1 px-3 outline-none border disabled:bg-gray-300"
          disabled
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
            {...register("phone_indicator")}
          />
          <input
            type="text"
            id="phone"
            className="col-span-3 py-1 px-3 outline-none border"
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
      <div className="flex flex-row justify-around gap-3 mt-2">
        <button
          type="button"
          className="py-1 px-4 border hover:bg-gray-400 cursor-pointer transition-colors"
          onClick={() => setEdit(false)}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="py-1 px-4 border hover:bg-gray-400 cursor-pointer transition-colors"
        >
          Save
        </button>
      </div>
    </form>
  );
}
