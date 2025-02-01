import { AxiosResponse, isAxiosError } from "axios";
import api from "../lib/axios";
import { OrderGeneralInfoDTO, OrderInfoDTO, PlaceOrderDTO } from "../types/order";

export async function createOrder(request: PlaceOrderDTO) {
  try {
    await api.post("/order/place-order", request);
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

export async function getOrdersByNit(nit: string) {
  try {
    const { data }: AxiosResponse<OrderInfoDTO[]> = await api.get(`/order/get-orders-by-nit/${nit}`);
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

export async function getOrdersById(id: number) {
  try {
    const { data }: AxiosResponse<OrderGeneralInfoDTO> = await api.get(`/order/get-order-by-id/${id}`);
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