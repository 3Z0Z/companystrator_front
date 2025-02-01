import { useState } from "react";

import { useAuthStorage } from "../../store";
import { ProductOrder } from "../../types/order";

import AdministrateCompany from "../../components/company/AdministrateCompany";
import OrderManage from "../../components/order/OrderManage";
import AdministrateProducts from "../../components/product/AdministrateProducts";
import OrderResume from "../../components/order/OrderResume";

export default function CompanyInfo() {
  const { role } = useAuthStorage();
  const [order, setOrder] = useState<ProductOrder[]>([]);

  return (
    <div className="grid grid-cols-4 justify-evenly items-start gap-5">
      <div className="flex flex-col gap-4">
        <AdministrateCompany />
        {role === 'ADMIN' && (
          <OrderResume />
        )}
        {role === 'CLIENT' && (
          <OrderManage order={order} setOrder={setOrder} />
        )}
      </div>
      <div className="col-span-3 flex flex-col gap-2 p-3 border w-full min-h-30">
        <AdministrateProducts setOrder={setOrder} />
      </div>
    </div>
  )
}
