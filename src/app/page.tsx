"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import Header from "../components/header";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaUpDown } from "react-icons/fa6";

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

const Home = () => {
  const [data, setData] = useState<Product[]>([]);
  const [likedItems, setLikedItems] = useState<number[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://fakestoreapi.com/products");
        const json = await response.json();
        setData(json);
      } catch (error) {
        console.error("Error fetching data:", error);
        setData([]);
      }
    };

    fetchData();
  }, []);

  const handleLike = (id: number) => {
    setLikedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleAddToCart = (product: Product) => {
    toast.success(`${product.title} savatga qo'shildi!`, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const filteredData = data.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="container mx-auto p-4">
      {/* Toastify bildirishnoma konteyneri */}
      <ToastContainer />

      {/* Header komponentiga searchTerm va handleSearch funksiyasini uzatamiz */}
      <Header searchTerm={searchTerm} handleSearch={handleSearch} />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 pt-32">
        {Array.isArray(filteredData) && filteredData.length > 0 ? (
          filteredData.map((product) => (
            <div
              key={product.id}
              className="bg-white border rounded-lg shadow-md overflow-hidden relative transform hover:-translate-y-1 hover:shadow-xl transition-all duration-300"
            >
              <Link href={`/product/${product.id}`}>
                <button
                  onClick={() => handleLike(product.id)}
                  className="absolute top-2 right-2 p-1 rounded-full bg-white shadow-md hover:bg-red-100 transition-colors duration-300"
                >
                  {likedItems.includes(product.id) ? (
                    <AiFillHeart className="text-red-500" size={20} />
                  ) : (
                    <AiOutlineHeart className="text-gray-400" size={20} />
                  )}
                </button>

                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-48 object-contain transition-transform duration-300 hover:scale-105"
                />

                <div className="p-4">
                  <h3 className="text-sm font-medium text-gray-800 truncate hover:text-yellow-500 transition-colors duration-300">
                    {product.title}
                  </h3>
                  <div className="text-xs text-gray-500 mb-1">
                    dan 1 275 313 so'm/oyga
                  </div>
                  <div className="text-gray-400 line-through text-xs mb-1">
                    20 576 470 so'm
                  </div>
                  <div className="text-red-600 font-bold text-lg mb-2">
                    {product.price} so'm
                  </div>
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="w-full mt-2 py-2 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-semibold rounded-md hover:from-yellow-500 hover:to-yellow-600 transition-colors duration-300"
                  >
                    Savatga
                  </button>
                </div>
              </Link>
            </div>
          ))
        ) : (
          <p>No products available</p>
        )}
      </div>

      <button
        onClick={handleBackToTop}
        className="fixed bottom-5 right-5 bg-yellow-500 text-white p-3 rounded-full shadow-lg hover:bg-yellow-600 transition-colors duration-300"
      >
        <FaUpDown />
      </button>
    </div>
  );
};
export default Home;
