import { AxiosResponse, isAxiosError } from "axios";

import { CategoriesDTO, CreateCategoryDTO, ProductDTO, UpdateProductDTO } from "../types/product";

import unauth_api from "../lib/unauth-axios";
import api from "../lib/axios";

export async function getProductsByNit(NIT: string) {
  try {
    const { data }: AxiosResponse<ProductDTO[]> = await unauth_api.get(`/product/get-products-by-nit/${NIT}`);
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

export async function getProductByCode(code: string) {
  try {
    const { data }: AxiosResponse<ProductDTO> = await unauth_api.get(`/product/get-product-by-code/${code}`);
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

export async function createProduct(nit: string, request: ProductDTO) {
  try {
    await api.post(`/product/create-product/${nit}`, request);
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

export async function updateProduct(code: string, request: UpdateProductDTO) {
  try {
    const { data }: AxiosResponse<ProductDTO> = await api.put(`/product/update-product/${code}`, request);
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

export async function deleteProduct(code: string) {
  try {
    await api.delete(`/product/delete-product/${code}`);
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

export async function getProductsCategories() {
  try {
    const { data }: AxiosResponse<CategoriesDTO[]> = await unauth_api.get(`/product/get-product-categories`);
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

export async function createProductCategory(request: CreateCategoryDTO) {
  try {
    await api.post(`/product/create-product-category`, request);
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