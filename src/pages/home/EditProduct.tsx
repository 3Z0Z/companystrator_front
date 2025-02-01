import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { SubmitHandler } from "react-hook-form";

import ProductForm from "../../components/product/ProductForm";
import { ProductDTO, UpdateProductDTO } from "../../types/product";
import { getProductByCode, updateProduct } from "../../services/ProductService";

export default function EditProduct() {
  const { code } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState<ProductDTO>();
  const [error, setError] = useState();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProductByCode(code!);
        setProduct(data);
      } catch(error: any) {
        console.log(error.message);
        setError(error.message);
      }
    }
    fetchProduct();
  }, []);

  const onSubmit: SubmitHandler<ProductDTO> = async (request: UpdateProductDTO) => {
    if (
      product?.name === request.name &&
      product?.description === request.description &&
      product?.price_cop === request.price_cop &&
      product?.price_usd === request.price_usd &&
      product?.price_mxn === request.price_mxn &&
      product?.primary_category === request.primary_category &&
      product?.secondary_category === request.secondary_category
    ) {
      navigate(-1);
      return;
    }
    try {
      await updateProduct(code!, request);
      navigate(-1);
    } catch(error: any) {
      console.log(error.message);
    }
  }

  return (
    <div className="max-w-150 border p-5 mx-auto mb-10">
      <ProductForm onSubmit={onSubmit} product={product} error={error} />
    </div>
  )
}
