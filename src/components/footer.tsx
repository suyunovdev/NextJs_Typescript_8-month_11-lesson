import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="mt-8 bg-gray-900 text-white py-8 text-center">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          <div>
            <h2 className="text-lg font-bold mb-4">Biz haqimizda</h2>
            <p className="text-sm">
              `Alif Shop` - sifatli va arzon mahsulotlar bozori. Bizning
              maqsadimiz mijozlarimizga eng yaxshi xizmatni taqdim etishdir.
            </p>
          </div>
          <div>
            <h2 className="text-lg font-bold mb-4">Foydali havolalar</h2>
            <ul className="text-sm space-y-2">
              <li>
                <Link href="/">Bosh sahifa</Link>
              </li>
              <li>
                <Link href="/about">Biz haqimizda</Link>
              </li>
              <li>
                <Link href="/contact">Aloqa</Link>
              </li>
              <li>
                <Link href="/faq">FAQ</Link>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="text-lg font-bold mb-4">Biz bilan aloqa</h2>
            <p className="text-sm">Email: info@alifshop.com</p>
            <p className="text-sm">Telefon: +998 90 123 45 67</p>
            <p className="text-sm">Manzil: Toshkent, O'zbekiston</p>
          </div>
        </div>
        <hr className="my-6 border-gray-700" />
        <p className="text-sm mt-4">
          © {new Date().getFullYear()} Alif Shop. Barcha huquqlar himoyalangan.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
