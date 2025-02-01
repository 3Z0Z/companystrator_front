import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { useAuthStorage } from "../../store"
import { CategoriesDTO, ProductDTO } from "../../types/product";
import { deleteProduct, getProductsByNit, getProductsCategories } from "../../services/ProductService";
import { ProductOrder } from "../../types/order";

type AdministrateProductsProps = {
  setOrder: Dispatch<SetStateAction<ProductOrder[]>>;
}

export default function AdministrateProducts({ setOrder } : Readonly<AdministrateProductsProps>) {
  const { nit } = useParams();
  const { role } = useAuthStorage();

  const [products, setProducts] = useState<ProductDTO[]>([]);
  const [categories, setCategories] = useState<CategoriesDTO[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const data = await getProductsByNit(nit!);
        setProducts(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const data = await getProductsCategories();
        setCategories(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
    fetchCategories();
  }, [nit]);

  const deleteProductAction = async (code: string) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this product?");
    if (confirmDelete) {
      try {
        await deleteProduct(code);
        setProducts(products.filter(product => product.code !== code));
      } catch(error: any) {
        console.log(error.message);
      }
    }
  }

  const addToOrder = (productToAdd: ProductDTO) => {
    setOrder((prevOrder) => {
      const existingProduct = prevOrder.find((prod) => prod.product === productToAdd);
      return existingProduct ? prevOrder.map((item) =>
        item.product === productToAdd
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ) : [...prevOrder, { product: productToAdd, quantity: 1 }];
    });
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <div className="flex flex-row justify-between">
        <h2 className="text-2xl font-bold">Products</h2>
        {role === 'ADMIN' && (
          <Link to={`/company/${nit}/create-product`} className="py-1 px-3 border bg-gray-200 cursor-pointer hover:bg-gray-400 transition-colors">
            Add product
          </Link>
        )}
      </div>
      {(products.length === 0) 
        ? <p className="text-center">This company does not have any products associated</p>
        : (
        <table>
          <thead className="border-b">
            <tr>
              <th className="py-2 max-w-1">Code</th>
              <th className="">Name</th>
              <th className="max-w-1">Description</th>
              <th>Price COP</th>
              <th>Price USD</th>
              <th>Price MXN</th>
              <th>Category</th>
              <th>Subcategory</th>
              {role !== 'VISITOR' && (
                <th>Action</th>
              )}
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr 
                key={product.code}
                className={`${index % 2 === 0 ? 'bg-gray-300' : ''} ${products.length - 1 > index ? 'border-b' : ''}`} 
              >
                <td className="text-center py-3">{product.code}</td>
                <td className="text-center">{product.name}</td>
                <td className="text-center">{product.description}</td>
                <td className="text-center">${product.price_cop}</td>
                <td className="text-center">${product.price_usd}</td>
                <td className="text-center">${product.price_mxn}</td>
                <td className="text-center">
                  {categories.find((cat) => cat.id === product.primary_category)?.category}
                </td>
                <td className="text-center">
                  {categories.find((cat) => cat.id === product.secondary_category)?.category}
                </td>
                <td className="text-center">
                  {role === 'ADMIN' && (
                    <div className="flex flex-row justify-center gap-3 px-2">
                      <Link 
                        to={`/company/${nit}/edit-product/${product.code}`}
                        className="py-1 px-3 border my-4 bg-gray-200 cursor-pointer hover:bg-gray-400 transition-colors"
                      >
                        Edit
                      </Link>
                      <button 
                        onClick={() => deleteProductAction(product.code)}
                        className="py-1 px-3 border my-4 bg-gray-200 cursor-pointer hover:bg-gray-400 transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  )}
                  {role === 'CLIENT' && (
                    <button 
                      onClick={() => addToOrder(product)}
                      className="py-1 px-3 border my-4 bg-gray-200 cursor-pointer hover:bg-gray-400 transition-colors"
                    >
                      Add to order
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  )
}
