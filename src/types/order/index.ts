import { ProductDTO } from "../product";

export type ProductOrder = {
  product: ProductDTO;
  quantity: number;
}

export type PlaceOrderDTO = {
  NIT: string;
  currency: string;
  order_items: OrderItemDTO[];
}

export type OrderItemDTO = {
  product_code: number;
  quantity: number;
}

export type OrderInfoDTO = {
  order_id: number;
  client_id: number;
  total_amount: number;
  currency: string;
  placet_at: string;
}

export type OrderGeneralInfoDTO = {
  order_id: number;
  client_id: number;
  total_amount: number;
  currency: string;
  order_items: OrderItemInfoDTO[];
}

export type OrderItemInfoDTO = {
  product_code: number;
  name: string;
  quantity: number;
  amount: number;
}