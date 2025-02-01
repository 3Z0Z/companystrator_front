import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getOrdersById, getOrdersByNit } from "../../services/OrderService";
import { OrderGeneralInfoDTO, OrderInfoDTO } from "../../types/order";

export default function OrderResume() {
  const { nit } = useParams();
  const [error, setError] = useState<string | null>(null);
  const [orders, setOrders] = useState<OrderInfoDTO[]>([]);
  const [orderDetails, setOrderDetails] = useState<OrderGeneralInfoDTO>();

  useEffect(() => {
    const fetchCompanyOrders = async () => {
      try {
        const data = await getOrdersByNit(nit!);
        setOrders(data);
      } catch(error: any) {
        setError(error.message);
      }
    }
    fetchCompanyOrders();
  }, []);

  const getOrderDetails = async (id: number) => {
    try {
      const data = await getOrdersById(id);
      setOrderDetails(data);
    } catch(error: any) {
      setError(error.message);
    }
  }

  const clearOrderDetails = () => {
    setOrderDetails(undefined);
  }

  return (
    <div className="flex flex-col gap-4 p-3 border w-full">
      {error && (<p>{error}</p>)}
      {orders.length > 0 
        ? (
          <>
            <h2 className="text-center text-2xl font-bold">Company Orders</h2>
            <table className="border">
              <thead className="border-b">
                <tr>
                  <th className="py-1">Order ID</th>
                  <th>Client ID</th>
                  <th>TOTAL</th>
                  <th>Currency</th>
                  <th>Details</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.order_id} className="border-b">
                    <td className="text-center py-1">{order.order_id}</td>
                    <td className="text-center py-1">{order.client_id}</td>
                    <td className="text-center py-1">{order.total_amount}</td>
                    <td className="text-center py-1">{order.currency}</td>
                    <td className="text-center py-1">
                      <button
                        onClick={() => getOrderDetails(order.order_id)}
                        className="border px-2 hover:bg-gray-400 cursor-pointer transition-colors"
                      >
                        More
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {orderDetails && (
              <div className="flex flex-col gap-2 p-3 border w-full">
                <div className="flex flex-row justify-between">
                  <h3 className="font-bold text-">Order {orderDetails.order_id} detailed</h3>
                  <button
                    onClick={() => clearOrderDetails()}
                    className="border px-2 hover:bg-gray-400 cursor-pointer transition-colors"
                  >
                    X
                  </button>
                </div>
                <div className="flex flex-col">
                  <p className="border-b pl-3"><span className="font-bold">Order ID:</span> {orderDetails.order_id}</p>
                  <p className="border-b pl-3"><span className="font-bold">Client ID:</span> {orderDetails.client_id}</p>
                  <p className="border-b pl-3"><span className="font-bold">TOTAL AMOUNT:</span> ${orderDetails.total_amount}</p>
                  <p className="border-b pl-3"><span className="font-bold">Currency:</span> {orderDetails.currency}</p>
                  <table className="border mt-2">
                    <thead>
                      <tr className="border-b">
                        <th className="py-1">Code</th>
                        <th>Name</th>
                        <th>Quantity</th>
                        <th>Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orderDetails.order_items.map((item) => (
                        <tr key={item.product_code} className="border-b">
                          <td className="text-center py-1">{item.product_code}</td>
                          <td className="text-center py-1">{item.name}</td>
                          <td className="text-center py-1">{item.quantity}</td>
                          <td className="text-center py-1">${item.amount}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </>
        ) : (
          <p className="text-center font-black">
            There are no orders yet
          </p>
        )
      }
    </div>
  )
}
