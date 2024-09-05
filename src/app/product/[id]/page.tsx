"use client";
import { useParams } from "next/navigation"; // 'useParams' ni ishlatish
import { useState, useEffect } from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type Rating = {
  count: number;
  rate: number;
};

type Product = {
  category: string;
  description: string;
  id: number;
  image: string;
  price: number;
  rating: Rating;
  title: string;
};

const SingleProduct = () => {
  const { id } = useParams(); // URL dan 'id' ni olish
  const [product, setProduct] = useState<Product | null>(null);
  const [liked, setLiked] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      const fetchProduct = async () => {
        try {
          const response = await fetch(
            `https://fakestoreapi.com/products/${id}`
          );
          if (!response.ok) {
            throw new Error("Mahsulotni olishda xatolik yuz berdi");
          }
          const data: Product = await response.json();
          setProduct(data);
        } catch (error) {
          console.error("Mahsulotni olishda xatolik:", error);
          setError(
            "Mahsulotni olishda xatolik yuz berdi. Iltimos, qayta urinib ko'ring."
          );
        } finally {
          setLoading(false);
        }
      };

      fetchProduct();
    }
  }, [id]);

  const handleLike = () => {
    setLiked((prev) => !prev);
    toast.success("Mahsulot like sahifasiga qo'shildi!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-white">Yuklanmoqda...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-white">Mahsulot topilmadi.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto pt-20 flex flex-col md:flex-row items-start gap-6">
      <div className="flex flex-col gap-4">
        <div className="w-72 h-72 border p-1">
          <img
            src={product.image}
            alt={product.title}
            className="object-cover w-full h-full"
          />
        </div>
        {/* Thumbnails */}
        <div className="flex gap-2">
          {[...Array(3)].map((_, index) => (
            <img
              key={index}
              src={product.image}
              alt={product.title}
              className="w-20 h-20 border p-1"
            />
          ))}
        </div>
      </div>

      <div className="flex-1 bg-white border rounded-lg shadow-sm p-6">
        <h1 className="text-2xl font-bold">{product.title}</h1>
        <div className="flex items-center gap-2 mt-2">
          <span className="text-yellow-500 text-lg">★★★★★</span>
          <span className="text-gray-500 text-sm">
            ({product.rating.count} sharh)
          </span>
        </div>
        <div className="mt-2 text-red-600 font-bold text-3xl">
          {product.price.toLocaleString()} som
        </div>
        <div className="mt-1 text-sm text-gray-400 line-through">
          {(product.price * 1.2).toLocaleString()} som
        </div>
        <p className="mt-2 text-gray-800">{product.description}</p>
        <div className="mt-4 flex items-center gap-4">
          <select className="p-2 border rounded-md">
            <option value="3">3 oylik</option>
            <option value="6">6 oylik</option>
            <option value="12">12 oylik</option>
            <option value="18">18 oylik</option>
            <option value="24">24 oylik</option>
          </select>
          <button className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded flex items-center gap-2">
            Savatga qoshish
          </button>
          <button
            onClick={handleLike}
            className="p-2 rounded-full bg-white shadow hover:bg-gray-100"
          >
            {liked ? (
              <AiFillHeart className="text-red-500" size={24} />
            ) : (
              <AiOutlineHeart className="text-gray-400" size={24} />
            )}
          </button>
        </div>
      </div>

      <div>
        <ToastContainer />
      </div>
    </div>
  );
};
export default SingleProduct;
