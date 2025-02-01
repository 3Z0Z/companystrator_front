import { AxiosResponse, isAxiosError } from "axios";
import unauth_api from "../lib/unauth-axios";
import { Jwt, LoginForm, RegisterForm } from "../types/auth";

export async function registerService(request: RegisterForm) {
  try {
    await unauth_api.post("/user/create-user", request);
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(
        error.response.data.error
          ? error.response.data.error
          : "Ocurrio un error desconocido"
      );
    }
    throw new Error("Ocurrió un error desconocido");
  }
}

export async function login(request: LoginForm) {
  try {
    const { data }: AxiosResponse<Jwt> = await unauth_api.post("/user/login", request);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(
        error.response.data.error
          ? error.response.data.error
          : "Ocurrio un error desconocido"
      );
    }
    throw new Error("Ocurrió un error desconocido");
  }
}

export async function logoutService() {
  try {
    await unauth_api.post("/user/logout");
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(
        error.response.data.error
          ? error.response.data.error
          : "Ocurrio un error desconocido"
      );
    }
    throw new Error("Ocurrió un error desconocido");
  }
}

export async function refreshTokenService() {
  try {
    const { data }: AxiosResponse<Jwt> = await unauth_api.post("/user/refresh-token");
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(
        error.response.data.error
          ? error.response.data.error
          : "Ocurrio un error desconocido"
      );
    }
    throw new Error("Ocurrió un error desconocido");
  }
}
