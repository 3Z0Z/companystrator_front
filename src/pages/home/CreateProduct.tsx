import { SubmitHandler } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

import { createProduct } from "../../services/ProductService";
import { ProductDTO } from "../../types/product";

import ProductForm from "../../components/product/ProductForm";
import { useState } from "react";

export default function CreateProduct() {
  const { nit } = useParams();
  const navigate = useNavigate();

  const [error, setError] = useState();

  const onSubmit: SubmitHandler<ProductDTO> = async (request: ProductDTO) => {
    try {
      await createProduct(nit!, request);
      navigate(-1);
    } catch(error: any) {
      console.log(error.message);
      setError(error.message);
    }
  }

  return (
    <div className="max-w-150 border p-5 mx-auto mb-10">
      <ProductForm onSubmit={onSubmit} error={error} />
    </div>
  )
}
