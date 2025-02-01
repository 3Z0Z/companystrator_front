import { ChangeEvent, Dispatch, SetStateAction, useState } from "react"

import { OrderItemDTO, PlaceOrderDTO, ProductOrder } from "../../types/order";
import { useParams } from "react-router-dom";
import { createOrder } from "../../services/OrderService";

type OrderManageProps = {
  order: ProductOrder[];
  setOrder: Dispatch<SetStateAction<ProductOrder[]>>
}

export default function OrderManage({ order, setOrder }: Readonly<OrderManageProps>) {
  const { nit } = useParams();
  const [currency, setCurrency] = useState<'COP'|'USD'|'MXN'>('COP');
  const [error, setError] = useState<string | null>(null);

  const placeOrder = async () => {
    const orderItems: OrderItemDTO[] = order.map((order) => {
      return { product_code: Number(order.product.code), quantity: order.quantity };
    });
    const orderRequest: PlaceOrderDTO = {
      NIT: nit!,
      currency,
      order_items: orderItems
    };
    try {
      await createOrder(orderRequest);
      window.alert('Order created');
      setOrder([]);
    } catch(error: any) {
      setError(error.message);
    }
  }

  const handleOnChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setCurrency(event.target.value as 'COP'|'USD'|'MXN');
  }

  const decreaseQuantity = (product: ProductOrder) => {
    setOrder(order.map((item) => 
      item === product 
        ? { ...item, quantity: item.quantity - 1 }
        : item
    ).filter((item) => item.quantity > 0));
  }

  const increaseQuantity = (product: ProductOrder) => {
    setOrder(order.map((item) => 
      item === product 
        ? { ...item, quantity: item.quantity + 1 }
        : item
    ));
  }

  if (order.length >= 1) return (
    <div className="flex flex-col gap-4 p-3 border w-full">
      <h2 className="text-center text-2xl font-bold">Order resume</h2>
      {error && (<p className="text-center font-black">{error}</p>)}
      <table className="border">
        <thead className="border-b bg-gray-300">
          <tr>
            <th>Name</th>
            <th>Quantity</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {order.map((product) => (
            <tr key={product.product.code} className="border-b">
              <td className="text-center py-1">{product.product.name}</td>
              <td className="py-1 flex flex-row justify-center items-center gap-3">
                <button
                  onClick={() => decreaseQuantity(product)}
                  className="font-bold bg-gray-300 hover:bg-gray-400 cursor-pointer rounded-full w-full"
                >
                  -
                </button>
                {product.quantity}
                <button
                  onClick={() => increaseQuantity(product)}
                  className="font-bold bg-gray-300 hover:bg-gray-400 cursor-pointer rounded-full w-full"
                >
                  +
                </button>
              </td>
              <td className="text-center">
                {currency === "COP" && `$ ${product.product.price_cop * product.quantity}`}
                {currency === "USD" && `$ ${product.product.price_usd * product.quantity}`}
                {currency === "MXN" && `$ ${product.product.price_mxn * product.quantity}`}
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot className="bg-gray-300">
          <tr>
            <td className="text-center">
              <select name="currency" className="w-30 bg-white" onChange={(event) => handleOnChange(event)}>
                <option value="COP">COP</option>
                <option value="USD">USD</option>
                <option value="MXN">MXN</option>
              </select>
            </td>
            <td className="text-center font-black py-2">TOTAL:</td>
            <td className="text-center font-black">
              {currency === "COP" && `$ ${order.reduce((total, item) => total + item.product.price_cop * item.quantity, 0)}`}
              {currency === "USD" && `$ ${order.reduce((total, item) => total + item.product.price_usd * item.quantity, 0)}`}
              {currency === "MXN" && `$ ${order.reduce((total, item) => total + item.product.price_mxn * item.quantity, 0)}`}
            </td>
          </tr>
        </tfoot>
      </table>
      <button
        onClick={() => placeOrder()}
        className="border py-1 text-center font-bold hover:bg-gray-400 cursor-pointer transition-colors"
      >
        Place order
      </button>
    </div>
  )
}
