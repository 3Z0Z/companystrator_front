import unauth_api from "../lib/unauth-axios";
import { AxiosResponse, isAxiosError } from "axios";
import { CompanyDTO } from "../types/company";

export async function getCompanies() {
  try {
    const { data }: AxiosResponse<CompanyDTO[]> = await unauth_api.get("/company/get-company-list");
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(
        error.response.data.message
          ? error.response.data.message
          : "Ocurrio un error desconocido"
      );
    }
    throw new Error("Ocurrió un error desconocido");
  }
}
